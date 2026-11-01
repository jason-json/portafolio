// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Project } from "./Project";
import { projects } from "../projects";

it("presents the case study in the authored narrative order", () => {
  render(
    <Project
      details={projects["/work/live-trace-explorer"]}
      base="/preview/"
    />,
  );
  expect(
    screen
      .getAllByRole("heading", { level: 2 })
      .slice(0, 4)
      .map((el) => el.textContent),
  ).toEqual(
    projects["/work/live-trace-explorer"].sections.map(
      (section) => section.title,
    ),
  );
  expect(
    screen
      .getByRole("link", { name: /back to selected work/i })
      .getAttribute("href"),
  ).toBe("/preview/#work");
});
