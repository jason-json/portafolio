import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Signal } from "./Signal";
import { MotionExperience } from "./MotionExperience";
import "./style.css";

const profile = {
  linkedin: "https://www.linkedin.com/in/jsonfigueroa/",
  email: "fjason047@gmail.com",
};
const isProject =
  window.location.pathname.replace(/\/$/, "") ===
  "/work/scheduling-optimization";
const isHome = window.location.pathname === "/";
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>;
}
function Header() {
  return (
    <header className="header">
      <a className="brand" href="/" aria-label="Portfolio home">
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
        <a href="/#work">Work</a>
        <a href="/#about">About</a>
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
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn <Arrow />
          </a>
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
function DataArt() {
  return (
    <div
      className="data-art"
      role="img"
      aria-label="Conceptual diagram of multiple data sources converging into a single interface"
    >
      <div className="data-grid" />
      <svg viewBox="0 0 500 300" aria-hidden="true">
        <g fill="none" stroke="#78846b" strokeWidth="1">
          <path d="M70 65 H170 Q200 65 200 95 V130 Q200 150 240 150 H350" />
          <path d="M70 150 H350" />
          <path d="M70 235 H170 Q200 235 200 205 V170 Q200 150 240 150" />
        </g>
        {[65, 150, 235].map((y) => (
          <g key={y}>
            <rect
              x="49"
              y={y - 18}
              width="42"
              height="36"
              rx="3"
              fill="#232920"
              stroke="#5c6850"
            />
            <path d={`M60 ${y - 4} H80 M60 ${y + 4} H75`} stroke="#bac9a4" />
          </g>
        ))}
        <rect
          x="335"
          y="105"
          width="100"
          height="90"
          rx="4"
          fill="#20291b"
          stroke="#bce88b"
        />
        <path
          d="M350 125 H417 M350 139 H386 M350 169 V153 M363 169 V148 M376 169 V157 M389 169 V145 M402 169 V151 M415 169 V139"
          stroke="#c5ee96"
        />
        <circle cx="245" cy="150" r="5" fill="#c5ee96" />
      </svg>
      <div className="art-caption">
        MULTIPLE SOURCES. ONE CLEAR VIEW. / CONCEPT
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
              href="/work/scheduling-optimization"
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
            <a className="project-title" href="/work/scheduling-optimization">
              <h3>Scheduling Optimization</h3>
              <Arrow />
            </a>
            <p>
              Making a complex calendar-management experience easier to navigate
              through considered frontend development.
            </p>
            <div className="tags">
              <span>Complex interfaces</span>
              <span>Frontend development</span>
            </div>
          </article>
          <article className="project">
            <DataArt />
            <div className="project-meta">
              <span>QAT GLOBAL</span>
              <span>02 / TECHNICAL LEADERSHIP</span>
            </div>
            <h3 className="plain-title">Connecting data. Aligning teams.</h3>
            <p>
              Leading a team developing features that bring multiple data
              sources into a dynamic user interface.
            </p>
            <div className="tags">
              <span>Data aggregation</span>
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
            development, reviewing code, and supporting a team at QAT Global.
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
function Project() {
  return (
    <>
      <section className="case-hero section">
        <a className="back-link" href="/#work">
          ← SELECTED WORK
        </a>
        <div className="eyebrow">QAT GLOBAL / PROFESSIONAL WORK / 01</div>
        <h1>
          Scheduling
          <br />
          <span className="serif">Optimization.</span>
        </h1>
        <p className="case-summary">
          Bringing clarity to a complex
          <br />
          calendar-management experience.
        </p>
        <div className="case-facts">
          <div>
            <span>ROLE</span>
            <p>Senior Full-Stack Developer</p>
          </div>
          <div>
            <span>CONTRIBUTION</span>
            <p>Frontend development</p>
          </div>
          <div>
            <span>CONTEXT</span>
            <p>QAT Global · 2019–2023 role</p>
          </div>
        </div>
        <ScheduleArt large />
      </section>
      <section className="case-body section">
        <aside>
          <span className="eyebrow">CASE STUDY / IN PROGRESS</span>
          <p>
            A professional contribution.
            <br />
            An interface with complexity.
          </p>
          <a href="#contact" className="text-link">
            Discuss my experience <Arrow />
          </a>
        </aside>
        <div className="case-narrative">
          <article>
            <span className="eyebrow">01 / THE PROBLEM</span>
            <h2>A calendar with more to solve.</h2>
            <p>
              Scheduling Optimization was a feature designed to streamline
              calendar management. Its complex UX and UI made frontend
              development a central part of the challenge.
            </p>
          </article>
          <article>
            <span className="eyebrow">02 / MY CONTRIBUTION</span>
            <h2>Turning requirements into an interface.</h2>
            <p>
              As a Senior Full-Stack Developer at QAT Global, I contributed
              technical expertise to the design and development of this
              solution, including work on its frontend.
            </p>
            <p>
              My broader role involved working with application owners
              throughout development, adapting to changing teams and
              requirements, and resolving critical issues.
            </p>
          </article>
          <article>
            <span className="eyebrow">03 / TECHNICAL DECISIONS</span>
            <h2>The reasoning deserves detail.</h2>
            <div className="content-placeholder">
              <span>CONTENT PENDING</span>
              <p>
                Specific architecture choices, scheduling constraints, and the
                project’s technology stack still need to be documented. These
                details will explain the tradeoffs behind the implementation.
              </p>
            </div>
          </article>
          <article>
            <span className="eyebrow">04 / THE OUTCOME</span>
            <h2>A positive client response.</h2>
            <p>
              In my account of the project, the client responded positively to
              the speed and quality of the frontend work.
            </p>
            <p className="muted">
              Quantitative results and public product screenshots have not been
              supplied. The calendar visual above is an illustrative concept,
              not a screenshot of the original application.
            </p>
          </article>
        </div>
      </section>
      <div className="section return-work">
        <a className="text-link" href="/#work">
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
        {isProject ? (
          <Project />
        ) : isHome ? (
          <Home />
        ) : (
          <section className="section not-found">
            <h1>Page not found.</h1>
            <a className="primary-link" href="/">
              Return home ↗
            </a>
          </section>
        )}
      </main>
    </>
  );
}
if (isProject) document.title = "Scheduling Optimization — Jason Figueroa";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionExperience>
      <App />
    </MotionExperience>
  </React.StrictMode>,
);
