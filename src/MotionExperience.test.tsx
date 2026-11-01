// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  act,
} from "@testing-library/react";
import { MotionExperience } from "./MotionExperience";
const state = vi.hoisted(() => ({
  reduced: false,
  fail: false,
  changes: [] as Array<() => void>,
  reveals: [] as Array<() => void>,
}));
vi.mock("motion", () => ({
  animate: vi.fn(() => {
    if (state.fail) throw Error("animation unavailable");
    return { stop: vi.fn(), then: vi.fn() };
  }),
  inView: vi.fn((_element, show) => {
    state.reveals.push(show);
    return () => {};
  }),
}));
function Content() {
  return (
    <>
      <header className="header">
        <a href="#work">Work</a>
      </header>
      <div className="hero-copy">
        <h1>
          <span className="headline-inner">Complexity.</span>
        </h1>
      </div>
      <div className="hero-visual">
        <canvas />
      </div>
      <section className="case-hero">
        <h2>Case study</h2>
      </section>
    </>
  );
}
beforeEach(() => {
  state.reduced = false;
  state.fail = false;
  state.changes = [];
  state.reveals = [];
  sessionStorage.clear();
  history.replaceState(null, "", "/");
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return state.reduced;
    },
    addEventListener: (_n: string, fn: () => void) => state.changes.push(fn),
    removeEventListener: vi.fn(),
  }));
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
  } as unknown as CanvasRenderingContext2D);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
describe("opening accessibility and replay", () => {
  it("renders a first-visit opening and Skip intro restores content", () => {
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    expect(screen.getByRole("button", { name: /Skip intro/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Skip intro/ }));
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
    expect(
      document.querySelector(".headline-inner")?.getAttribute("style"),
    ).toBeNull();
  });
  it.each(["Escape", "PageDown"])("finishes on %s", (key) => {
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    fireEvent.keyDown(window, { key });
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
  });
  it("finishes on scroll intent", () => {
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    fireEvent.wheel(window);
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
  });
  it("finishes when keyboard focus enters content", () => {
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    fireEvent.focusIn(screen.getByRole("link", { name: "Work" }));
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
  });
  it("does not replay within a session", () => {
    const first = render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    first.unmount();
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
  });
  it.each(["/work/scheduling-optimization", "/#contact"])(
    "skips direct entry %s and subsequent homepage return",
    (path) => {
      history.replaceState(null, "", path);
      const first = render(
        <MotionExperience>
          <Content />
        </MotionExperience>,
      );
      expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
      first.unmount();
      history.replaceState(null, "", "/");
      render(
        <MotionExperience>
          <Content />
        </MotionExperience>,
      );
      expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
    },
  );
  it("shows content immediately for reduced motion", () => {
    state.reduced = true;
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
    expect(
      document.querySelector(".headline-inner")?.getAttribute("style"),
    ).toBeNull();
    expect(
      document.querySelector(".case-hero h2")?.getAttribute("style"),
    ).toBeNull();
  });
  it("recovers visible content if animation setup fails", () => {
    state.fail = true;
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
    expect(
      document.querySelector(".headline-inner")?.getAttribute("style"),
    ).toBeNull();
    expect(
      document.querySelector(".case-hero h2")?.getAttribute("style"),
    ).toBeNull();
  });
  it("completes with its fallback timeout even when animation frames stall", () => {
    vi.useFakeTimers();
    render(
      <MotionExperience>
        <Content />
      </MotionExperience>,
    );
    act(() => vi.advanceTimersByTime(2700));
    expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
    vi.useRealTimers();
  });
});

it("restores a reveal if its animation throws after intersection", () => {
  history.replaceState(null, "", "/work/scheduling-optimization");
  render(
    <MotionExperience>
      <Content />
    </MotionExperience>,
  );
  state.fail = true;
  act(() => state.reveals.forEach((show) => show()));
  expect(
    document.querySelector(".case-hero h2")?.getAttribute("style"),
  ).toBeNull();
});
it("switches to visible content when reduced motion is enabled mid-intro", () => {
  render(
    <MotionExperience>
      <Content />
    </MotionExperience>,
  );
  state.reduced = true;
  act(() => state.changes.forEach((change) => change()));
  expect(screen.queryByRole("button", { name: /Skip intro/ })).toBeNull();
  expect(
    document.querySelector(".case-hero h2")?.getAttribute("style") || "",
  ).not.toContain("opacity: 0");
});
