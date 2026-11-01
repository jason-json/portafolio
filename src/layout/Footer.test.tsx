// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

it("offers equivalent email links and a return to the top", () => {
  render(<Footer />);
  for (const name of ["Email me", "Email Jason Figueroa"])
    expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(
      "mailto:jasonfigueroa.json@gmail.com",
    );
  expect(
    screen.getByRole("link", { name: /back to top/i }).getAttribute("href"),
  ).toBe("#top");
});
