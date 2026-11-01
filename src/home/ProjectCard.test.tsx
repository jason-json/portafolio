// @vitest-environment jsdom
import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { projects } from "../projects";
import { ProjectCard } from "./ProjectCard";

afterEach(cleanup);
it.each([
  {
    project: projects["/work/scheduling-optimization"],
    illustration: /calendar layout/i,
  },
  {
    project: projects["/work/live-trace-explorer"],
    illustration: /project graph/i,
  },
])(
  "links both entry points to the supplied destination for $project.title",
  ({ project, illustration }) => {
    const href = "/custom-base/featured";
    render(<ProjectCard project={project} href={href} />);
    const imageLink = screen.getByRole("link", {
      name: `Read ${project.title} case study`,
    });
    expect(
      within(imageLink).getByRole("img", { name: illustration }),
    ).toBeTruthy();
    expect(imageLink.getAttribute("href")).toBe(href);
    expect(
      screen.getByRole("link", { name: project.title }).getAttribute("href"),
    ).toBe(href);
  },
);
