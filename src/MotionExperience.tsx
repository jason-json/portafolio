import { Arrow } from "./Arrow";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { animate, inView } from "motion";
import { drawSculpture } from "./Signal";

const SESSION_KEY = "signal-structure:intro-seen";
const ease = [0.22, 1, 0.36, 1] as const;
function shouldIntroduce() {
  if (
    location.pathname !== import.meta.env.BASE_URL ||
    location.hash ||
    window.scrollY > 0 ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return false;
  }
}

/** Progressive enhancement: content is visible unless a working animation owns it. */
export function MotionExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const eligible = useRef(shouldIntroduce());
  const finishRef = useRef<() => void>(() => {});
  const [opening, setOpening] = useState(eligible.current);

  useLayoutEffect(() => {
    const container = root.current!;
    // The browser can resolve a fragment before React has mounted its target.
    if (location.hash)
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const controls: ReturnType<typeof animate>[] = [];
    const restores: (() => void)[] = [];
    const introControls: ReturnType<typeof animate>[] = [];
    const introRestores: (() => void)[] = [];
    const observers: (() => void)[] = [];
    const revealTimers: number[] = [];
    let frame = 0,
      timer = 0,
      done = false;
    const remember = (element: HTMLElement) => {
      const original = element.getAttribute("style");
      const restore = () =>
        original === null
          ? element.removeAttribute("style")
          : element.setAttribute("style", original);
      restores.push(restore);
      return restore;
    };
    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      introControls.forEach((c) => c.stop());
      introRestores.forEach((restore) => restore());
      setOpening(false);
    };
    finishRef.current = finish;
    const keyboard = (event: KeyboardEvent) => {
      if (
        [
          "Escape",
          "PageDown",
          "PageUp",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        finish();
    };
    const focus = () => finish();
    const motionChange = () => {
      if (reduced.matches) {
        finish();
        controls.forEach((c) => c.stop());
        observers.forEach((stop) => stop());
        container
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) => {
            el.style.removeProperty("opacity");
            el.style.removeProperty("transform");
            el.style.removeProperty("clip-path");
          });
      }
    };
    try {
      // Any first entry counts: returning from a direct project or deep link must not replay.
      sessionStorage.setItem(SESSION_KEY, "1");
      if (!reduced.matches) {
        const targets = container.querySelectorAll<HTMLElement>(
          ".section-heading > div, .section-heading > p, .project-art-link, .project > .data-art, .project-meta, .project-title, .plain-title, .project > p, .tags, .earlier-work, .skill-grid > article, .about-intro > *, .career-row, .contact > *, .case-hero > *, .case-body aside, .case-narrative article, .return-work",
        );
        targets.forEach((element, index) => {
          element.dataset.reveal = "";
          const restore = remember(element);
          let revealed = false;
          const image = element.matches(
            ".project-art-link, .data-art, .schedule-art",
          );
          // Never hide content already visible or targeted by a deep link.
          const bounds = element.getBoundingClientRect();
          if (
            bounds.top < innerHeight &&
            bounds.bottom > 0 &&
            !element.closest(".case-hero")
          )
            return;
          element.style.opacity = "0";
          element.style.transform = image ? "scale(1.025)" : "translateY(20px)";
          if (image) element.style.clipPath = "inset(12% 0 0 0)";
          let revealControl: ReturnType<typeof animate> | undefined;
          const show = () => {
            if (revealed) return;
            revealed = true;
            try {
              const control = animate(
                element,
                {
                  opacity: 1,
                  transform: image ? "scale(1)" : "translateY(0px)",
                  ...(image ? { clipPath: "inset(0% 0 0 0)" } : {}),
                },
                {
                  duration: image ? 0.7 : 0.55,
                  delay: (index % 3) * 0.055,
                  ease,
                },
              );
              revealControl = control;
              controls.push(control);
              void control.then(restore);
              revealTimers.push(
                window.setTimeout(() => {
                  control.stop();
                  restore();
                }, 950),
              );
            } catch {
              restore();
            }
          };
          observers.push(
            inView(element, show, { margin: "0px 0px -24px 0px" }),
          );
          const focusReveal = () => {
            revealed = true;
            revealControl?.stop();
            restore();
          };
          element.addEventListener("focusin", focusReveal);
          observers.push(() =>
            element.removeEventListener("focusin", focusReveal),
          );
        });
      }
      if (eligible.current && !reduced.matches) {
        const introTargets: [string, number][] = [
          [".hero h1 .headline-inner", 1.05],
          [".hero-copy > .eyebrow", 1.38],
          [".hero-copy > p", 1.48],
          [".hero-copy > .primary-link", 1.58],
          [".header", 1.65],
          [".hero-foot", 1.7],
          [".hero-visual > :not(canvas)", 1.55],
        ];
        introTargets.forEach(([selector, delay]) =>
          container
            .querySelectorAll<HTMLElement>(selector)
            .forEach((element, index) => {
              introRestores.push(remember(element));
              element.style.opacity = "0";
              element.style.transform = element.classList.contains(
                "headline-inner",
              )
                ? "translateY(105%)"
                : "translateY(20px)";
              introControls.push(
                animate(
                  element,
                  { opacity: 1, transform: "translateY(0)" },
                  { duration: 0.6, delay: delay + index * 0.12, ease },
                ),
              );
            }),
        );
        const underlying = container.querySelector<HTMLElement>(
          ".hero-visual canvas",
        )!;
        introRestores.push(remember(underlying));
        underlying.style.opacity = "0";
        const overlay = canvas.current!;
        const context = overlay.getContext("2d");
        if (!context) {
          finish();
          return;
        }
        const started = performance.now();
        const render = (now: number) => {
          if (done) return;
          try {
            const elapsed = (now - started) / 1000;
            const target = underlying.getBoundingClientRect();
            const w = innerWidth,
              h = innerHeight,
              dpr = Math.min(devicePixelRatio, 2);
            if (
              overlay.width !== Math.round(w * dpr) ||
              overlay.height !== Math.round(h * dpr)
            ) {
              overlay.width = Math.round(w * dpr);
              overlay.height = Math.round(h * dpr);
            }
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            context.clearRect(0, 0, w, h);
            const converge = Math.min(1, elapsed / 1.15);
            const assemble = 1 - Math.pow(1 - converge, 3);
            const move = Math.min(1, Math.max(0, (elapsed - 0.65) / 1.1));
            const settle = move * move * (3 - 2 * move);
            const cx =
              w / 2 + (target.left + target.width / 2 - w / 2) * settle;
            const cy =
              h / 2 + (target.top + target.height / 2 - h / 2) * settle;
            const initialSize = Math.min(w * 0.3, h * 0.32);
            const size =
              initialSize +
              (Math.min(target.width * 0.37, target.height * 0.38) -
                initialSize) *
                settle;
            context.fillStyle = `rgba(17,19,16,${1 - Math.min(1, Math.max(0, (elapsed - 0.65) / 0.65))})`;
            context.fillRect(0, 0, w, h);
            drawSculpture(context, {
              width: w,
              height: h,
              cx,
              cy,
              size,
              phase: 0.6 + elapsed * 0.54,
              assembly: assemble,
              rings: w < 600 ? 30 : 46,
            });
            if (elapsed >= 2.2) finish();
            else frame = requestAnimationFrame(render);
          } catch {
            finish();
          }
        };
        frame = requestAnimationFrame(render);
        timer = window.setTimeout(finish, 2600);
        window.addEventListener("wheel", finish, { passive: true });
        window.addEventListener("touchmove", finish, { passive: true });
        window.addEventListener("scroll", finish, { passive: true });
        window.addEventListener("keydown", keyboard);
        container.addEventListener("focusin", focus);
      } else setOpening(false);
    } catch {
      finish();
      controls.forEach((c) => c.stop());
      observers.forEach((stop) => stop());
      restores.forEach((restore) => restore());
    }
    reduced.addEventListener("change", motionChange);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      revealTimers.forEach(clearTimeout);
      controls.forEach((c) => c.stop());
      introControls.forEach((c) => c.stop());
      observers.forEach((stop) => stop());
      restores.forEach((restore) => restore());
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
      window.removeEventListener("scroll", finish);
      window.removeEventListener("keydown", keyboard);
      container.removeEventListener("focusin", focus);
      reduced.removeEventListener("change", motionChange);
    };
  }, []);
  return (
    <div ref={root} className="motion-root">
      {children}
      {opening && (
        <div className="opening-layer">
          <canvas ref={canvas} aria-hidden="true" />
          <div className="opening-caption" aria-hidden="true">
            SIGNAL / STRUCTURE <span>FROM COMPLEXITY TO CLARITY</span>
          </div>
          <button className="skip-intro" onClick={() => finishRef.current()}>
            Skip intro <Arrow />
          </button>
        </div>
      )}
    </div>
  );
}
