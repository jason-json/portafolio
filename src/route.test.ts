import { expect, it } from "vitest";
import { resolveRoute } from "./route";
const cases = [
  {
    slug: "scheduling-optimization",
    title: "Scheduling Optimization",
  },
  {
    slug: "live-trace-explorer",
    title: "Live Trace Explorer",
  },
];

it.each(["/", "/portafolio/"])(
  "resolves native page paths under %s",
  (base) => {
    expect(resolveRoute(base, base).kind).toBe("home");
    for (const { slug, title } of cases) {
      for (const suffix of ["", "/"])
        expect(
          resolveRoute(base + "work/" + slug + suffix, base),
        ).toMatchObject({ kind: "project", project: { title } });
    }
    expect(resolveRoute(base + "missing", base).kind).toBe("not-found");
  },
);

it("rejects paths outside the deployed portfolio", () => {
  expect(resolveRoute("/work/live-trace-explorer", "/portafolio/").kind).toBe(
    "not-found",
  );
});
