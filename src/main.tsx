import { Arrow } from "./Arrow";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Signal } from "./Signal";
import { MotionExperience } from "./MotionExperience";
import "./style.css";
import { projects, type ProjectPath } from "./projects";

const profile = {
  email: "jasonfigueroa.json@gmail.com",
};
const base = import.meta.env.BASE_URL;
const pathname = "/" + window.location.pathname.slice(base.length);
const projectPath = pathname.replace(/\/$/, "") as ProjectPath;
const project = Object.hasOwn(projects, projectPath)
  ? projects[projectPath]
  : undefined;
const isHome = pathname === "/";
function Header() {
  return (
    <header className="header">
      <a className="brand" href={base} aria-label="Portfolio home">
        <span className="brand-symbol" aria-hidden="true">
          ✳
        </span>
        <span>
          JASON
          <br />
          FIGUEROA
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href={base + "#work"}>Work</a>
        <a href={base + "#about"}>About</a>
        <a href="#contact" className="nav-contact">
          Let’s talk <Arrow />
        </a>
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <>
      <section id="contact" className="contact section">
        <div className="eyebrow">
          <span className="status-dot" /> NEXT CONVERSATION
        </div>
        <div className="contact-row">
          <h2>
            Have something
            <br />
            <span className="serif">complex in mind?</span>
          </h2>
          <a
            className="round-link"
            href={`mailto:${profile.email}`}
            aria-label="Email Jason Figueroa"
          >
            <Arrow />
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            Let’s talk about your team, your product,
            <br />
            or the problem you’re trying to solve.
          </p>
        </div>
        <a className="text-link email-link" href={`mailto:${profile.email}`}>
          Email me <Arrow />
        </a>
      </section>
      <footer className="footer">
        <span>COSTA RICA · BUILT WITH INTENTION</span>
        <a href="#top">BACK TO TOP ↑</a>
        <span>© {new Date().getFullYear()} · JASON FIGUEROA</span>
      </footer>
    </>
  );
}
function ScheduleArt({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`schedule-art ${large ? "large" : ""}`}
      role="img"
      aria-label="Illustrative calendar layout showing scheduled blocks across five days. This is a concept, not the original product interface."
    >
      <div className="mock-top">
        <span className="mock-icon">⊞</span>
        <span>Scheduling / Overview</span>
        <span className="mock-pill">Week view</span>
      </div>
      <div className="calendar">
        <div className="calendar-times">
          09:00
          <br />
          10:00
          <br />
          11:00
          <br />
          12:00
          <br />
          13:00
        </div>
        {["MON", "TUE", "WED", "THU", "FRI"].map((day, i) => (
          <div className="calendar-day" key={day}>
            <span>{day}</span>
            <div className={`event event-${i}`}>
              <i />
              <i />
            </div>
            {i % 2 === 0 && (
              <div className={`event secondary secondary-${i}`}>
                <i />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="art-caption">
        <span className="status-dot" /> INTERFACE STUDY — ILLUSTRATIVE CONCEPT
      </div>
    </div>
  );
}
function TraceArt({ large = false }: { large?: boolean }) {
  const nodes = [
    {
      x: 28,
      y: 112,
      title: "Project item",
      status: "In progress",
      progress: 68,
    },
    { x: 193, y: 40, title: "Related item", status: "Complete", progress: 100 },
    { x: 193, y: 184, title: "Related item", status: "Review", progress: 42 },
    { x: 358, y: 112, title: "Test item", status: "In progress", progress: 75 },
  ];
  return (
    <div
      className={`data-art trace-art ${large ? "large" : ""}`}
      role="img"
      aria-label="Illustrative project graph with connected item cards, a dashed suspect relationship, statuses, and sample progress percentages."
    >
      <div className="data-grid" />
      <svg viewBox="0 0 500 300" aria-hidden="true">
        <g fill="none" stroke="#91a77b" strokeWidth="1">
          <path d="M142 150 C170 150 165 78 193 78 M142 150 C170 150 165 222 193 222 M307 78 C335 78 330 150 358 150" />
          <path
            d="M307 222 C335 222 330 150 358 150"
            stroke="#d4bc83"
            strokeDasharray="4 4"
          />
        </g>
        {nodes.map((node) => (
          <g key={node.title + node.y}>
            <rect
              x={node.x}
              y={node.y}
              width="114"
              height="76"
              rx="4"
              fill="#20291b"
              stroke="#637851"
            />
            <text x={node.x + 10} y={node.y + 18} fill="#ecf0e5" fontSize="10">
              {node.title}
            </text>
            <text x={node.x + 10} y={node.y + 34} fill="#b7c6a8" fontSize="8">
              {node.status}
            </text>
            <rect
              x={node.x + 10}
              y={node.y + 47}
              width="66"
              height="3"
              fill="#3e4c33"
            />
            <rect
              x={node.x + 10}
              y={node.y + 47}
              width={(66 * node.progress) / 100}
              height="3"
              fill="#c5ed98"
            />
            <text x={node.x + 83} y={node.y + 51} fill="#c5ed98" fontSize="8">
              {node.progress}%
            </text>
          </g>
        ))}
      </svg>
      <div className="art-caption">
        ILLUSTRATIVE GRAPH · SAMPLE DATA · DASHED = SUSPECT LINK
      </div>
    </div>
  );
}
function Home() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> SENIOR FULL-STACK DEVELOPER & TECH
            LEAD
          </div>
          <h1>
            <span className="headline-mask">
              <span className="headline-inner">Complexity.</span>
            </span>
            <span className="headline-mask">
              <span className="headline-inner serif">Made clear.</span>
            </span>
          </h1>
          <p>
            I turn complex requirements into clear,
            <br className="desktop-break" /> dependable web applications.
          </p>
          <a className="primary-link" href="#work">
            Explore selected work <span>↓</span>
          </a>
        </div>
        <div className="hero-visual">
          <div className="visual-marker marker-top">
            FIG. 01 — SIGNAL / STRUCTURE
          </div>
          <Signal paused={paused} />
          <span className="cross cross-one">+</span>
          <span className="cross cross-two">+</span>
          <div className="visual-marker marker-bottom">
            <span>ORDER WITHIN COMPLEXITY</span>
            <button onClick={() => setPaused(!paused)} aria-pressed={paused}>
              {paused ? "RESUME MOTION" : "PAUSE MOTION"}{" "}
              <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
            </button>
          </div>
        </div>
        <div className="hero-foot">
          <span>BASED IN COSTA RICA</span>
          <span>FRONTEND ARCHITECTURE · FULL-STACK DEVELOPMENT</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
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
          <article className="project">
            <a
              href={base + "work/scheduling-optimization"}
              className="project-art-link"
              aria-label="Read Scheduling Optimization case study"
            >
              <ScheduleArt />
              <span className="art-open">
                <Arrow />
              </span>
            </a>
            <div className="project-meta">
              <span>QAT GLOBAL</span>
              <span>01 / FRONTEND ENGINEERING</span>
            </div>
            <a className="project-title" href={base + "work/scheduling-optimization"}>
              <h3>Scheduling Optimization</h3>
              <Arrow />
            </a>
            <p>
              Owning the frontend for appointment scheduling across locations,
              time zones, availability, and user permissions.
            </p>
            <div className="tags">
              <span>Complex interfaces</span>
              <span>Frontend development</span>
            </div>
          </article>
          <article className="project">
            <a
              href={base + "work/live-trace-explorer"}
              className="project-art-link"
              aria-label="Read Live Trace Explorer case study"
            >
              <TraceArt />
              <span className="art-open">
                <Arrow />
              </span>
            </a>
            <div className="project-meta">
              <span>LIVE TRACE EXPLORER</span>
              <span>02 / TECHNICAL LEADERSHIP</span>
            </div>
            <a className="project-title" href={base + "work/live-trace-explorer"}>
              <h3>Live Trace Explorer</h3>
              <Arrow />
            </a>
            <p>
              Leading frontend architecture and team delivery for an interactive
              graph of project relationships, status, and progress.
            </p>
            <div className="tags">
              <span>Graph visualization</span>
              <span>Team leadership</span>
            </div>
          </article>
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
      <section className="section expertise">
        <div className="section-heading">
          <div>
            <div className="eyebrow">02 / MY TOOLKIT</div>
            <h2>
              Depth where it matters.
              <br />
              <span className="muted">Range where it helps.</span>
            </h2>
          </div>
        </div>
        <div className="skill-grid">
          {[
            {
              n: "01",
              title: "Frontend architecture",
              text: "Complex interfaces built with clarity, maintainability, and the user in mind.",
              tools: "TypeScript / React / Next.js / SCSS",
            },
            {
              n: "02",
              title: "End-to-end development",
              text: "Connecting interfaces, application logic, and cloud infrastructure.",
              tools: "Node.js / AWS / MongoDB",
            },
            {
              n: "03",
              title: "Technical leadership",
              text: "Code reviews, testing strategy, and the support teams need to move forward.",
              tools: "Technical direction / Mentoring / Scrum",
            },
          ].map((s) => (
            <article key={s.n}>
              <span className="skill-number">{s.n} /</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="skill-tools">{s.tools}</div>
            </article>
          ))}
        </div>
      </section>
      <section id="about" className="section about">
        <div className="about-intro">
          <div className="eyebrow">03 / THE PERSON BEHIND THE CODE</div>
          <h2>
            A builder first.
            <br />
            <span className="serif">A team player, always.</span>
          </h2>
          <p>
            My work has grown from custom websites and data-driven applications
            to complex product interfaces and technical leadership.
          </p>
          <p>
            I enjoy finding practical ways through difficult requirements—and
            helping the people around me do the same. Today, that means guiding
            development, reviewing code, and supporting a team.
          </p>
          <span className="location">↳ COSTA RICA</span>
        </div>
        <div id="experience" className="timeline">
          <div className="career-row">
            <span>2023 — PRESENT</span>
            <h3>Technical Lead</h3>
            <p>QAT Global</p>
            <small>
              Team guidance, data aggregation interfaces, code reviews, and
              time-sensitive releases.
            </small>
          </div>
          <div className="career-row">
            <span>2019 — 2023</span>
            <h3>Senior Full-Stack Developer</h3>
            <p>QAT Global</p>
            <small>
              Complex application development, testing strategy, AWS solution
              reviews, and incident resolution.
            </small>
          </div>
          <div className="career-row">
            <span>2018 — 2019</span>
            <h3>Web application development</h3>
            <p>MiWeb · now Extendo</p>
            <small>
              Custom websites and data visualization with React, Gatsby,
              Node.js, MongoDB, and AWS delivery tools.
            </small>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
function Project({ details }: { details: (typeof projects)[ProjectPath] }) {
  const isScheduling = details.title === "Scheduling Optimization";
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
        {isScheduling ? <ScheduleArt large /> : <TraceArt large />}
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
function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        {project ? (
          <Project details={project} />
        ) : isHome ? (
          <Home />
        ) : (
          <section className="section not-found">
            <h1>Page not found.</h1>
            <a className="primary-link" href={base}>
              Return home <Arrow />
            </a>
          </section>
        )}
      </main>
    </>
  );
}
if (project) document.title = `${project.title} — Jason Figueroa`;
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionExperience>
      <App />
    </MotionExperience>
  </React.StrictMode>,
);
