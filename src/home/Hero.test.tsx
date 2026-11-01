// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
vi.mock("../Signal", () => ({
  Signal: ({ paused }: { paused: boolean }) => (
    <canvas data-testid="sculpture" data-paused={paused} />
  ),
}));
afterEach(cleanup);

it("pauses and resumes the sculpture from the accessible hero control", () => {
  render(<Hero />);
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
