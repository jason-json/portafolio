import { projects, type ProjectPath } from "./projects";
export function resolveRoute(pathname: string, base: string) {
  if (pathname === base) return { kind: "home" } as const;
  if (pathname.startsWith(base)) {
    const path = "/" + pathname.slice(base.length).replace(/\/$/, "");
    if (Object.hasOwn(projects, path))
      return {
        kind: "project",
        project: projects[path as ProjectPath],
      } as const;
  }
  return { kind: "not-found" } as const;
}
