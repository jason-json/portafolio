// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Expertise } from "./Expertise";

it("groups each skill with its relevant tools", () => {
  render(<Expertise />);
  const skills = screen.getAllByRole("article");
  for (const [title, tools] of [
    ["Frontend architecture", "TypeScript"],
    ["End-to-end development", "Node.js"],
    ["Technical leadership", "Mentoring"],
  ]) {
    const skill = skills.find((el) =>
      within(el).queryByRole("heading", { name: title }),
    );
    expect(skill?.textContent).toContain(tools);
  }
});
