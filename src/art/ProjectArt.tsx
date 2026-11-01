import { ScheduleArt } from "./ScheduleArt";
import { TraceArt } from "./TraceArt";
import type { ProjectDetails } from "../projects";

const art = { calendar: ScheduleArt, graph: TraceArt };
export function ProjectArt({
  kind,
  large,
}: {
  kind: ProjectDetails["art"];
  large?: boolean;
}) {
  const Illustration = art[kind];
  return <Illustration large={large} />;
}
