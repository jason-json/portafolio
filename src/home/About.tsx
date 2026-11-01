export function About() {
  return (
    <section id="about" className="section about">
      <div className="about-intro">
        <div className="eyebrow">03 / THE PERSON BEHIND THE CODE</div>
        <h2>
          A builder first.
          <br />
          <span className="serif">A team player, always.</span>
        </h2>
        <p>
          My work has grown from custom websites and data-driven applications to
          complex product interfaces and technical leadership.
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
            Custom websites and data visualization with React, Gatsby, Node.js,
            MongoDB, and AWS delivery tools.
          </small>
        </div>
      </div>
    </section>
  );
}
