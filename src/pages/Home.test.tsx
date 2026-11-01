// @vitest-environment jsdom
import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
vi.mock("../Signal", () => ({ Signal: () => null }));

it("connects the hero and career links to their sections", () => {
  render(<Home base="/" />);
  for (const name of [/explore selected work/i, /view experience/i]) {
    const hash = screen.getByRole("link", { name }).getAttribute("href")!;
    expect(document.querySelector(hash)?.querySelector("h2,h3")).toBeTruthy();
  }
});
