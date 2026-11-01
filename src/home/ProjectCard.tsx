import { Arrow } from "../Arrow";
import { ProjectArt } from "../art/ProjectArt";
import type { ProjectDetails } from "../projects";
export function ProjectCard({
  project,
  href,
}: {
  project: ProjectDetails;
  href: string;
}) {
  return (
    <article className="project">
      <a
        href={href}
        className="project-art-link"
        aria-label={`Read ${project.title} case study`}
      >
        <ProjectArt kind={project.art} />
        <span className="art-open">
          <Arrow />
        </span>
      </a>
      <div className="project-meta">
        <span>{project.card.label}</span>
        <span>{project.card.discipline}</span>
      </div>
      <a className="project-title" href={href}>
        <h3>{project.title}</h3>
        <Arrow />
      </a>
      <p>{project.card.description}</p>
      <div className="tags">
        {project.card.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
