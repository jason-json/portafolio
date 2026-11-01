import { Arrow } from "../Arrow";
import { projects } from "../projects";
import { ProjectCard } from "./ProjectCard";
export function SelectedWork({ base }: { base: string }) {
  return (
    <section id="work" className="section work">
      <div className="section-heading">
        <div>
          <div className="eyebrow">01 / SELECTED WORK</div>
          <h2>Behind the interface.</h2>
        </div>
        <p>
          Real challenges. Thoughtful solutions.
          <br />
          Selected contributions from my professional work.
        </p>
      </div>
      <div className="project-grid">
        {Object.entries(projects).map(([path, project]) => (
          <ProjectCard
            key={path}
            project={project}
            href={base + path.slice(1)}
          />
        ))}
      </div>
      <div className="earlier-work">
        <span className="eyebrow">EARLIER / MIWEB → EXTENDO</span>
        <p>
          Custom websites, landing pages, and applications that process and
          visualize data.
        </p>
        <a className="text-link" href="#experience">
          View experience <Arrow />
        </a>
      </div>
    </section>
  );
}
