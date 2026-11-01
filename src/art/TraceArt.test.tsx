// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TraceArt } from "./TraceArt";

it("explains the sample data and suspect relationship notation", () => {
  render(<TraceArt />);
  expect(
    screen.getByRole("img", { name: /dashed suspect relationship/i }),
  ).toBeTruthy();
  expect(screen.getByText(/sample data.*dashed = suspect link/i)).toBeTruthy();
});
