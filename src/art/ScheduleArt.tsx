export function ScheduleArt({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`schedule-art ${large ? "large" : ""}`}
      role="img"
      aria-label="Illustrative calendar layout showing scheduled blocks across five days. This is a concept, not the original product interface."
    >
      <div className="mock-top">
        <span className="mock-icon">⊞</span>
        <span>Scheduling / Overview</span>
        <span className="mock-pill">Week view</span>
      </div>
      <div className="calendar">
        <div className="calendar-times">
          09:00
          <br />
          10:00
          <br />
          11:00
          <br />
          12:00
          <br />
          13:00
        </div>
        {["MON", "TUE", "WED", "THU", "FRI"].map((day, i) => (
          <div className="calendar-day" key={day}>
            <span>{day}</span>
            <div className={`event event-${i}`}>
              <i />
              <i />
            </div>
            {i % 2 === 0 && (
              <div className={`event secondary secondary-${i}`}>
                <i />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="art-caption">
        <span className="status-dot" /> INTERFACE STUDY — ILLUSTRATIVE CONCEPT
      </div>
    </div>
  );
}
