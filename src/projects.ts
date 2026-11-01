export const projects = {
  "/work/scheduling-optimization": {
    title: "Scheduling Optimization",
    art: "calendar",
    card: {
      label: "QAT GLOBAL",
      discipline: "01 / FRONTEND ENGINEERING",
      description:
        "Owning the frontend for appointment scheduling across locations, time zones, availability, and user permissions.",
      tags: ["Complex interfaces", "Frontend development"],
    },
    headline: ["Scheduling", "Optimization."],
    label: "QAT GLOBAL / PROFESSIONAL WORK / 01",
    summary:
      "Coordinating appointments around people, places, and availability.",
    role: "Senior Full-Stack Developer",
    contribution: "Frontend ownership & architecture",
    context: "Doctor and client scheduling",
    aside: "A calendar shaped by real-world scheduling constraints.",
    sections: [
      {
        label: "01 / THE CHALLENGE",
        title: "Every appointment had more than one constraint.",
        paragraphs: [
          "Scheduling appointments meant coordinating doctors and clients across locations, time zones, and daily schedules. Existing and tentative appointments, overlapping bookings, and details specific to each client’s case all influenced the scheduling workflow.",
          "The interface also had to keep appointments synchronized, enforce different permissions for each user role, and present large datasets without slowing down everyday interactions.",
        ],
      },
      {
        label: "02 / MY CONTRIBUTION",
        title: "Owning the complete frontend experience.",
        paragraphs: [
          "I owned the frontend portions of the project, including the calendar, its day-to-day interactions, scheduling restrictions, and the interface for appointment optimization.",
          "That responsibility extended beyond the calendar to supporting forms, notifications, and distinct interfaces for the different user roles. I translated the scheduling requirements into connected workflows across those views.",
        ],
      },
      {
        label: "03 / TECHNICAL DECISIONS",
        title: "Keeping complex workflows responsive.",
        paragraphs: [
          "I led the frontend architecture decisions and defined how large datasets were represented in the views, with responsiveness as a central concern. The architecture needed to support both calendar interactions and the surrounding optimization workflows.",
          "I also contributed technical feedback and ideas during design discussions, helping the designers shape interactions around the application’s constraints and the needs of each user role.",
        ],
      },
      {
        label: "04 / THE OUTCOME",
        title: "Less time spent coordinating appointments.",
        paragraphs: [
          "The project improved daily scheduling activities and saved users time in their work. Bringing the relevant constraints into the calendar and supporting workflows helped users coordinate appointments for doctors and clients more efficiently.",
        ],
      },
    ],
  },
  "/work/live-trace-explorer": {
    title: "Live Trace Explorer",
    art: "graph",
    card: {
      label: "LIVE TRACE EXPLORER",
      discipline: "02 / TECHNICAL LEADERSHIP",
      description:
        "Leading frontend architecture and team delivery for an interactive graph of project relationships, status, and progress.",
      tags: ["Graph visualization", "Team leadership"],
    },
    headline: ["Live Trace", "Explorer."],
    label: "PROFESSIONAL WORK / TECHNICAL LEADERSHIP / 02",
    summary:
      "Making project relationships, status, and progress visible in one graph.",
    role: "Technical Lead",
    contribution: "Graph architecture & team delivery",
    context: "Project traceability",
    aside: "Connected project items. A clearer view of progress.",
    sections: [
      {
        label: "01 / THE CHALLENGE",
        title: "Making large datasets understandable.",
        paragraphs: [
          "Live Trace Explorer presents project items as cards connected by relationship lines. Users can inspect relationships, suspect relationships, test items, and the status of individual items within the graph.",
          "The challenge was loading large datasets and displaying their items alongside related status statistics. Progress percentages reflected completed steps, giving users a graphical way to understand how related items were progressing.",
        ],
      },
      {
        label: "02 / MY CONTRIBUTION",
        title: "From graph architecture to team delivery.",
        paragraphs: [
          "As technical lead, I designed the frontend architecture for the graph and defined the workflow for loading and displaying its data. I shared that architecture with the team, broke down and organized the remaining work, and monitored implementation.",
          "I also worked with product owners to align subsequent features, guiding the team as smaller, complex capabilities were added within the same graph experience.",
        ],
      },
      {
        label: "03 / TECHNICAL DECISIONS",
        title: "Designing around the data and the stack.",
        paragraphs: [
          "I led decisions about how the graph loaded and displayed information, taking the existing technology stack and database structure into account. The frontend workflow needed to keep large collections of items and their statistics usable without creating slow interfaces.",
          "I contributed technical feedback and ideas to the designers, connecting the visual design with the practical constraints of the graph architecture and data model.",
        ],
      },
      {
        label: "04 / THE OUTCOME",
        title: "Clearer tracking across connected work.",
        paragraphs: [
          "Live Trace Explorer improved how users tracked project items and understood their relationships. Its graphical presentation made project progress easier to follow and helped users move their development work forward more quickly.",
        ],
      },
    ],
  },
} as const;
export type ProjectPath = keyof typeof projects;

export type ProjectDetails = (typeof projects)[ProjectPath];
