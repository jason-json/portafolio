// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import { About } from "./About";

it("places the current role first at the experience anchor", () => {
  render(<About />);
  const timeline = document.getElementById("experience")!;
  expect(within(timeline).getAllByRole("heading")[0].textContent).toBe(
    "Technical Lead",
  );
});
