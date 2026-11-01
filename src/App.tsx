import { useEffect } from "react";
import { Header } from "./layout/Header";
import { Home } from "./pages/Home";
import { Project } from "./pages/Project";
import { Arrow } from "./Arrow";
import { resolveRoute } from "./route";
export function App({
  pathname = window.location.pathname,
  base = import.meta.env.BASE_URL,
}: {
  pathname?: string;
  base?: string;
}) {
  const route = resolveRoute(pathname, base);
  const title =
    route.kind === "project"
      ? route.project.title + " — Jason Figueroa"
      : "Jason Figueroa — Senior Full-Stack Developer";
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header base={base} />
      <main id="main">
        {route.kind === "project" ? (
          <Project base={base} details={route.project} />
        ) : route.kind === "home" ? (
          <Home base={base} />
        ) : (
          <section className="section not-found">
            <h1>Page not found.</h1>
            <a className="primary-link" href={base}>
              Return home <Arrow />
            </a>
          </section>
        )}
      </main>
    </>
  );
}
