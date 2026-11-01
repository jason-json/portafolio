import { Arrow } from "../Arrow";
import { Footer } from "../layout/Footer";
import { ProjectArt } from "../art/ProjectArt";
import type { ProjectDetails } from "../projects";
export function Project({
  details,
  base,
}: {
  details: ProjectDetails;
  base: string;
}) {
  return (
    <>
      <section className="case-hero section">
        <a className="back-link" href={base + "#work"}>
          ← SELECTED WORK
        </a>
        <div className="eyebrow">{details.label}</div>
        <h1>
          {details.headline[0]}
          <br />
          <span className="serif">{details.headline[1]}</span>
        </h1>
        <p className="case-summary">{details.summary}</p>
        <div className="case-facts">
          <div>
            <span>ROLE</span>
            <p>{details.role}</p>
          </div>
          <div>
            <span>CONTRIBUTION</span>
            <p>{details.contribution}</p>
          </div>
          <div>
            <span>CONTEXT</span>
            <p>{details.context}</p>
          </div>
        </div>
        <ProjectArt kind={details.art} large />
      </section>
      <section className="case-body section">
        <aside>
          <span className="eyebrow">CASE STUDY / PROFESSIONAL WORK</span>
          <p>{details.aside}</p>
          <a href="#contact" className="text-link">
            Discuss my experience <Arrow />
          </a>
        </aside>
        <div className="case-narrative">
          {details.sections.map((section) => (
            <article key={section.label}>
              <span className="eyebrow">{section.label}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
      <div className="section return-work">
        <a className="text-link" href={base + "#work"}>
          ← Back to selected work
        </a>
      </div>
      <Footer />
    </>
  );
}
