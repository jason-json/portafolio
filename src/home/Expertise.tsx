export function Expertise() {
  return (
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
  );
}
