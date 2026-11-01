// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectArt } from "./ProjectArt";

it("switches the illustration when the project changes", () => {
  const view = render(<ProjectArt kind="calendar" />);
  expect(screen.getByRole("img", { name: /calendar layout/i })).toBeTruthy();
  view.rerender(<ProjectArt kind="graph" large />);
  expect(
    screen
      .getByRole("img", { name: /project graph/i })
      .classList.contains("large"),
  ).toBe(true);
});
