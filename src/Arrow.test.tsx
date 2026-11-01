// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Arrow } from "./Arrow";

it("keeps decorative arrows out of a link’s accessible name", () => {
  render(
    <a href="/work">
      View project <Arrow />
    </a>,
  );
  expect(
    screen
      .getByRole("link", { name: "View project" })
      .querySelector("svg")
      ?.getAttribute("focusable"),
  ).toBe("false");
});
