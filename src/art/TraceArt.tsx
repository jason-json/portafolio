export function TraceArt({ large = false }: { large?: boolean }) {
  const nodes = [
    {
      x: 28,
      y: 112,
      title: "Project item",
      status: "In progress",
      progress: 68,
    },
    { x: 193, y: 40, title: "Related item", status: "Complete", progress: 100 },
    { x: 193, y: 184, title: "Related item", status: "Review", progress: 42 },
    { x: 358, y: 112, title: "Test item", status: "In progress", progress: 75 },
  ];
  return (
    <div
      className={`data-art trace-art ${large ? "large" : ""}`}
      role="img"
      aria-label="Illustrative project graph with connected item cards, a dashed suspect relationship, statuses, and sample progress percentages."
    >
      <div className="data-grid" />
      <svg viewBox="0 0 500 300" aria-hidden="true">
        <g fill="none" stroke="#91a77b" strokeWidth="1">
          <path d="M142 150 C170 150 165 78 193 78 M142 150 C170 150 165 222 193 222 M307 78 C335 78 330 150 358 150" />
          <path
            d="M307 222 C335 222 330 150 358 150"
            stroke="#d4bc83"
            strokeDasharray="4 4"
          />
        </g>
        {nodes.map((node) => (
          <g key={node.title + node.y}>
            <rect
              x={node.x}
              y={node.y}
              width="114"
              height="76"
              rx="4"
              fill="#20291b"
              stroke="#637851"
            />
            <text x={node.x + 10} y={node.y + 18} fill="#ecf0e5" fontSize="10">
              {node.title}
            </text>
            <text x={node.x + 10} y={node.y + 34} fill="#b7c6a8" fontSize="8">
              {node.status}
            </text>
            <rect
              x={node.x + 10}
              y={node.y + 47}
              width="66"
              height="3"
              fill="#3e4c33"
            />
            <rect
              x={node.x + 10}
              y={node.y + 47}
              width={(66 * node.progress) / 100}
              height="3"
              fill="#c5ed98"
            />
            <text x={node.x + 83} y={node.y + 51} fill="#c5ed98" fontSize="8">
              {node.progress}%
            </text>
          </g>
        ))}
      </svg>
      <div className="art-caption">
        ILLUSTRATIVE GRAPH · SAMPLE DATA · DASHED = SUSPECT LINK
      </div>
    </div>
  );
}
