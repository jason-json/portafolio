import { useEffect, useRef } from "react";

type Sculpture = {
  width: number;
  height: number;
  cx: number;
  cy: number;
  size: number;
  phase: number;
  assembly?: number;
  rings: number;
  pointer?: { x: number; y: number };
};
/** Shared geometry lets the full-screen opening settle into the exact hero sculpture. */
export function drawSculpture(
  ctx: CanvasRenderingContext2D,
  {
    width,
    height,
    cx,
    cy,
    size,
    phase,
    assembly = 1,
    rings,
    pointer = { x: 0, y: 0 },
  }: Sculpture,
) {
  for (let ring = 0; ring < rings; ring++) {
    const u = (ring / rings) * Math.PI * 2;
    ctx.beginPath();
    for (let step = 0; step <= 72; step++) {
      const v = (step / 72) * Math.PI * 2,
        r = 1 + 0.34 * Math.cos(v);
      let x = r * Math.cos(u),
        y = r * Math.sin(u),
        z = 0.34 * Math.sin(v);
      const twist = 0.55 + phase * 0.12 + pointer.x * 0.12,
        xx = x * Math.cos(twist) - z * Math.sin(twist);
      z = x * Math.sin(twist) + z * Math.cos(twist);
      x = xx;
      const tilt = 0.88 + pointer.y * 0.1,
        yy = y * Math.cos(tilt) - z * Math.sin(tilt);
      y = yy;
      const px = cx + (x * Math.cos(-0.55) - y * Math.sin(-0.55)) * size;
      const py = cy + (x * Math.sin(-0.55) + y * Math.cos(-0.55)) * size;
      const scatterX =
        ((((Math.sin(ring * 127.1) * 43758.5453) % 1) + 1) % 1) * width;
      const scatterY =
        ((((Math.sin(ring * 311.7) * 17341.13) % 1) + 1) % 1) * height;
      const sx = scatterX + (step / 72 - 0.5) * width * 0.19;
      const sy =
        scatterY + (step / 72 - 0.5) * Math.sin(ring * 2.4) * height * 0.12;
      const dx = sx + (px - sx) * assembly,
        dy = sy + (py - sy) * assembly;
      if (!step) ctx.moveTo(dx, dy);
      else ctx.lineTo(dx, dy);
    }
    ctx.strokeStyle = `rgba(197,230,147,${0.22 + 0.38 * ((Math.sin(u + phase * 0.12) + 1) / 2)})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
}
export function Signal({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!,
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      phase = 0.6,
      visible = true,
      width = 0,
      height = 0,
      last = 0;
    const pointer = { x: 0, y: 0 };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawSculpture(ctx, {
        width,
        height,
        cx: width / 2,
        cy: height / 2,
        size: Math.min(width * 0.37, height * 0.38),
        phase,
        rings: innerWidth < 600 ? 30 : 46,
        pointer,
      });
    };
    const tick = (now: number) => {
      frame = 0;
      if (document.hidden || !visible || paused || reduced.matches) return;
      phase += Math.min(last ? (now - last) / 1000 : 0, 0.05) * 0.54;
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      draw();
      if (!document.hidden && visible && !paused && !reduced.matches)
        frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(canvas);
    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - b.left) / b.width - 0.5;
      pointer.y = (e.clientY - b.top) / b.height - 0.5;
    };
    canvas.addEventListener("pointermove", move);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointermove", move);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);
  return <canvas ref={ref} aria-hidden="true" className="signal-canvas" />;
}
