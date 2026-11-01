// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

it("links home and its sections from a nested case study", () => {
  render(<Header base="/preview/" />);
  for (const [name, href] of [
    ["Portfolio home", "/preview/"],
    ["Work", "/preview/#work"],
    ["About", "/preview/#about"],
    ["Let’s talk", "#contact"],
  ])
    expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(href);
});
