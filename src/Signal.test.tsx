// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Signal } from "./Signal";

// jsdom has no canvas or viewport observers. Keep the component's scheduling
// logic real and control only the browser events that drive it.
function setupBrowser(reducedMotion = false) {
  vi.useFakeTimers();
  const stroke = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    setTransform() {},
    clearRect() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke,
  } as unknown as CanvasRenderingContext2D);
  vi.stubGlobal("matchMedia", () => ({
    matches: reducedMotion,
    addEventListener() {},
    removeEventListener() {},
  }));
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  let reportIntersection: (entries: { isIntersecting: boolean }[]) => void;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof reportIntersection) {
        reportIntersection = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  return {
    stroke,
    setVisible(visible: boolean) {
      reportIntersection([{ isIntersecting: visible }]);
    },
    nextFrameDraws() {
      stroke.mockClear();
      vi.advanceTimersToNextFrame();
      return stroke.mock.calls.length > 0;
    },
  };
}
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("draws a static sculpture when the visitor prefers reduced motion", () => {
  const browser = setupBrowser(true);
  render(<Signal paused={false} />);
  expect(browser.stroke).toHaveBeenCalled();
  expect(browser.nextFrameDraws()).toBe(false);
});

it("stops drawing offscreen, restarts when visible and stops on unmount", () => {
  const browser = setupBrowser();
  const view = render(<Signal paused={false} />);
  expect(browser.nextFrameDraws()).toBe(true);
  browser.setVisible(false);
  expect(browser.nextFrameDraws()).toBe(false);
  browser.setVisible(true);
  expect(browser.nextFrameDraws()).toBe(true);
  view.unmount();
  expect(browser.nextFrameDraws()).toBe(false);
});

it("honors pause and resume when the hero changes the paused prop", () => {
  const browser = setupBrowser();
  const view = render(<Signal paused />);
  expect(browser.nextFrameDraws()).toBe(false);
  view.rerender(<Signal paused={false} />);
  expect(browser.nextFrameDraws()).toBe(true);
  view.rerender(<Signal paused />);
  expect(browser.nextFrameDraws()).toBe(false);
});
