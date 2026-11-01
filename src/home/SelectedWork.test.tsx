// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SelectedWork } from "./SelectedWork";
import { projects } from "../projects";

it("links each featured project beneath the supplied base", () => {
  render(<SelectedWork base="/preview/" />);
  for (const [path, project] of Object.entries(projects)) {
    expect(
      screen.getByRole("link", { name: project.title }).getAttribute("href"),
    ).toBe("/preview" + path);
  }
  expect(
    screen.getByRole("link", { name: "View experience" }).getAttribute("href"),
  ).toBe("#experience");
});
