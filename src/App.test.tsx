// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { App } from "./App";
import { resolveRoute } from "./route";

vi.mock("./Signal", () => ({
  Signal: ({ paused }: { paused: boolean }) => (
    <canvas data-testid="sculpture" data-paused={paused} />
  ),
}));
afterEach(cleanup);

const cases = [
  {
    slug: "scheduling-optimization",
    title: "Scheduling Optimization",
    art: /calendar layout/i,
  },
  {
    slug: "live-trace-explorer",
    title: "Live Trace Explorer",
    art: /project graph/i,
  },
];

it.each(["/", "/portafolio/"])(
  "resolves native page paths under %s",
  (base) => {
    expect(resolveRoute(base, base).kind).toBe("home");
    for (const { slug, title } of cases) {
      for (const suffix of ["", "/"])
        expect(
          resolveRoute(base + "work/" + slug + suffix, base),
        ).toMatchObject({ kind: "project", project: { title } });
    }
    expect(resolveRoute(base + "missing", base).kind).toBe("not-found");
  },
);

it("keeps section links, accessible contact links and project destinations intact", () => {
  const base = "/portafolio/";
  render(<App base={base} pathname={base} />);
  for (const link of screen.getAllByRole("link")) {
    const href = link.getAttribute("href")!;
    if (href.includes("#"))
      expect(document.getElementById(href.split("#")[1])).toBeTruthy();
  }
  expect(
    screen.getByRole("link", { name: "Skip to content" }).getAttribute("href"),
  ).toBe("#main");
  for (const [label, hash] of [
    ["Work", "work"],
    ["About", "about"],
  ])
    expect(
      within(screen.getByRole("navigation"))
        .getByRole("link", { name: label })
        .getAttribute("href"),
    ).toBe(base + "#" + hash);
  for (const name of ["Email me", "Email Jason Figueroa"])
    expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(
      "mailto:jasonfigueroa.json@gmail.com",
    );
  for (const { title, slug, art } of cases) {
    const imageLink = screen.getByRole("link", {
      name: "Read " + title + " case study",
    });
    expect(within(imageLink).getByRole("img", { name: art })).toBeTruthy();
    for (const link of [imageLink, screen.getByRole("link", { name: title })])
      expect(link.getAttribute("href")).toBe(base + "work/" + slug);
  }
});

it.each(cases)(
  "opens $title directly with its narrative and return link",
  ({ slug, title, art }) => {
    const base = "/portafolio/";
    render(<App base={base} pathname={base + "work/" + slug + "/"} />);
    expect(document.title).toBe(title + " — Jason Figueroa");
    expect(screen.getByRole("img", { name: art })).toBeTruthy();
    expect(screen.getByText("01 / THE CHALLENGE")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /Back to selected work/i })
        .getAttribute("href"),
    ).toBe(base + "#work");
  },
);

it("offers a return-home link for unknown paths", () => {
  render(<App base="/portafolio/" pathname="/portafolio/missing" />);
  expect(screen.getByRole("heading", { name: "Page not found." })).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Return home" }).getAttribute("href"),
  ).toBe("/portafolio/");
});

it("pauses and resumes the sculpture from the accessible hero control", () => {
  render(<App base="/" pathname="/" />);
  for (const [name, paused] of [
    ["PAUSE MOTION", "false"],
    ["RESUME MOTION", "true"],
    ["PAUSE MOTION", "false"],
  ]) {
    const button = screen.getByRole("button", { name });
    expect(button.getAttribute("aria-pressed")).toBe(paused);
    expect(screen.getByTestId("sculpture").getAttribute("data-paused")).toBe(
      paused,
    );
    fireEvent.click(button);
  }
});
