import { Arrow } from "../Arrow";
export function Header({ base }: { base: string }) {
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
