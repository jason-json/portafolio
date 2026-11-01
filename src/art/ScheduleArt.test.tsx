// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScheduleArt } from "./ScheduleArt";

it("identifies the calendar as an illustrative concept", () => {
  render(<ScheduleArt />);
  expect(
    screen.getByRole("img", {
      name: /concept, not the original product interface/i,
    }),
  ).toBeTruthy();
  expect(screen.getByText(/illustrative concept/i)).toBeTruthy();
});
