// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { App } from "./App";

vi.mock("./Signal", () => ({ Signal: () => null }));
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
