import { useState } from "react";
import { Signal } from "../Signal";
export function Hero() {
  const [paused, setPaused] = useState(false);
  return (
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
  );
}
