import { Arrow } from "../Arrow";
const profile = {
  email: "jasonfigueroa.json@gmail.com",
};
export function Footer() {
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
