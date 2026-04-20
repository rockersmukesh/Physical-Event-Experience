import Link from "next/link";
import VenueIcon from "@/components/VenueIcon";
import { getDashboardData } from "@/lib/demo-data";

function formatEventStart(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function SmartDashboard() {
  const { alerts, gameState, hubEvents, menuItems, ticket, waitPoints } = await getDashboardData();

  const fastestRestroom =
    waitPoints
      .filter((point) => point.category === "restrooms")
      .sort((a, b) => a.waitMinutes - b.waitMinutes)[0] ?? waitPoints[0];
  const fastestExit =
    waitPoints
      .filter((point) => point.category === "exits")
      .sort((a, b) => a.waitMinutes - b.waitMinutes)[0] ?? waitPoints[0];
  const queueSnapshot = waitPoints.slice(0, 4);
  const expressPickupItem =
    menuItems
      .filter((item) => item.inStock)
      .sort((a, b) => Number.parseInt(a.prepTime, 10) - Number.parseInt(b.prepTime, 10))[0] ??
    menuItems[0];
  const busiestZones = waitPoints.filter((point) => point.status === "Busy").length;
  const leadAlert = alerts[0];
  const latestHubItem = hubEvents[0];

  return (
    <main className="mx-auto max-w-[1600px] space-y-8 p-4 pt-8 sm:p-6 sm:pt-10 lg:p-8 lg:pt-12">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 font-label text-sm uppercase tracking-[0.35em] text-primary">
            Attendee Command Center
          </p>
          <h1 className="font-headline text-5xl font-black uppercase tracking-tight text-on-surface sm:text-6xl">
            Stadium Pulse
          </h1>
          <p className="mt-3 max-w-2xl text-base text-on-surface-variant sm:text-lg">
            Live routing, queue-aware ordering, and event coordination driven from the demo venue
            database so every screen stays presentation-ready.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.28em] text-primary">
            {fastestExit.name} {fastestExit.waitMinutes} min wait
          </div>
          <div className="rounded-full border border-tertiary/20 bg-tertiary/10 px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.28em] text-tertiary">
            {expressPickupItem.name} ready in {expressPickupItem.prepTime}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.9fr)]">
        <article className="relative overflow-hidden rounded-[2rem] border border-outline-variant/15 bg-[linear-gradient(135deg,rgba(22,24,32,0.92),rgba(12,13,18,0.96))] p-6 shadow-2xl sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,199,255,0.2),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(171,214,0,0.14),transparent_30%)]"></div>
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-tertiary shadow-[0_0_10px_#abd600]"></span>
                  <span className="font-label text-sm font-bold uppercase tracking-[0.3em] text-tertiary">
                    Live venue
                  </span>
                </div>
                <h2 className="font-headline text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                  {ticket.eventName}
                </h2>
                <p className="mt-4 text-lg text-on-surface-variant">
                  {ticket.venueName} • Section {ticket.section} • Row {ticket.row} • Seat {ticket.seat}
                </p>
              </div>

              <div className="w-full max-w-sm rounded-[1.5rem] border border-outline-variant/15 bg-surface-variant/35 p-5 backdrop-blur-xl">
                <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
                  Event start
                </p>
                <p className="mt-3 font-label text-3xl font-black text-primary">
                  {formatEventStart(ticket.eventStart)}
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">Primary entry at Gate {ticket.gate}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/ticket"
                    className="rounded-xl bg-primary px-4 py-3 text-center font-label text-sm font-black uppercase tracking-[0.22em] text-on-primary transition hover:opacity-90"
                  >
                    View Ticket
                  </Link>
                  <Link
                    href="/map"
                    className="rounded-xl border border-outline-variant/20 bg-background/40 px-4 py-3 text-center font-label text-sm font-bold uppercase tracking-[0.22em] text-on-surface transition hover:border-primary/40"
                  >
                    Open Map
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/map"
                className="rounded-[1.5rem] border border-outline-variant/15 bg-black/20 p-5 transition hover:border-primary/40"
              >
                <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
                  Crowd movement
                </p>
                <p className="mt-3 font-headline text-2xl font-black uppercase text-on-surface">
                  {fastestExit.name}
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">{fastestExit.routeHint}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-label text-xs uppercase tracking-[0.22em] text-tertiary">
                    {fastestExit.waitMinutes} min wait
                  </span>
                  <VenueIcon name="arrow_forward" className="text-primary text-[1.2rem]" />
                </div>
              </Link>

              <Link
                href="/order"
                className="rounded-[1.5rem] border border-outline-variant/15 bg-black/20 p-5 transition hover:border-primary/40"
              >
                <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
                  Waiting time relief
                </p>
                <p className="mt-3 font-headline text-2xl font-black uppercase text-on-surface">
                  {expressPickupItem.name}
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Live concessions inventory says this is one of the fastest in-stock options at the
                  venue right now.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-label text-xs uppercase tracking-[0.22em] text-tertiary">
                    Ready in {expressPickupItem.prepTime}
                  </span>
                  <VenueIcon name="arrow_forward" className="text-primary text-[1.2rem]" />
                </div>
              </Link>

              <Link
                href="/hub"
                className="rounded-[1.5rem] border border-outline-variant/15 bg-black/20 p-5 transition hover:border-primary/40"
              >
                <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
                  Real-time coordination
                </p>
                <p className="mt-3 font-headline text-2xl font-black uppercase text-on-surface">
                  {leadAlert?.title ?? "Live Hub"}
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {leadAlert?.detail ?? latestHubItem?.text ?? "Live game and routing updates are flowing from the database."}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-label text-xs uppercase tracking-[0.22em] text-tertiary">
                    {hubEvents.length} live updates
                  </span>
                  <VenueIcon name="arrow_forward" className="text-primary text-[1.2rem]" />
                </div>
              </Link>
            </div>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[1.75rem] border border-outline-variant/15 bg-surface-container-low/85 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
                  Active hotspots
                </p>
                <p className="mt-2 font-headline text-5xl font-black text-error">{busiestZones}</p>
              </div>
              <div className="rounded-full border border-tertiary/25 bg-tertiary/10 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.22em] text-tertiary">
                Route guidance on
              </div>
            </div>
            <p className="mt-4 text-sm text-on-surface-variant">
              {leadAlert?.detail ??
                "The venue team is actively routing guests away from high-friction concourse zones."}
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-outline-variant/15 bg-surface-container-low/85 p-6 backdrop-blur-xl">
            <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
              Best restroom option
            </p>
            <h3 className="mt-3 font-headline text-3xl font-black uppercase text-on-surface">
              {fastestRestroom.name}
            </h3>
            <p className="mt-2 text-sm text-on-surface-variant">{fastestRestroom.routeHint}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-[0.22em] text-tertiary">
                {fastestRestroom.waitMinutes} min wait
              </span>
              <span className="font-label text-xs uppercase tracking-[0.22em] text-on-surface-variant">
                {fastestRestroom.zone}
              </span>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-outline-variant/15 bg-[linear-gradient(135deg,rgba(173,199,255,0.12),rgba(171,214,0,0.08))] p-6">
            <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
              Live score
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-headline text-5xl font-black text-on-surface">
                  {gameState.homeScore} - {gameState.awayScore}
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {gameState.homeTeam} vs {gameState.awayTeam} • {gameState.periodLabel} • {gameState.clock}
                </p>
              </div>
              <VenueIcon name="verified" className="text-5xl text-primary" />
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <article className="rounded-[2rem] border border-outline-variant/15 bg-surface-container-low/75 p-6 backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
                Queue snapshot
              </p>
              <h3 className="mt-2 font-headline text-3xl font-black uppercase text-on-surface">
                Keep Moving
              </h3>
            </div>
            <Link
              href="/map"
              className="rounded-full border border-outline-variant/20 px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.22em] text-on-surface transition hover:border-primary/40"
            >
              View live routes
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {queueSnapshot.map((point) => (
              <div
                key={point.id}
                className="rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-lowest/80 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-headline text-2xl font-black uppercase text-on-surface">
                      {point.name}
                    </p>
                    <p className="mt-2 text-sm text-on-surface-variant">{point.zone}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-headline text-3xl font-black ${
                        point.waitMinutes <= 4
                          ? "text-tertiary"
                          : point.waitMinutes <= 10
                            ? "text-primary"
                            : "text-error"
                      }`}
                    >
                      {point.waitMinutes}m
                    </p>
                    <p className="font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
                      {point.status}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-on-surface-variant">{point.routeHint}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-outline-variant/15 bg-surface-container-low/75 p-6 backdrop-blur-xl sm:p-8">
          <p className="font-label text-xs uppercase tracking-[0.28em] text-on-surface-variant">
            Live coordination
          </p>
          <h3 className="mt-2 font-headline text-3xl font-black uppercase text-on-surface">
            Operations Feed
          </h3>

          <div className="mt-6 space-y-4">
            {alerts.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                className={`rounded-[1.5rem] border p-4 ${
                  alert.level === "warning"
                    ? "border-error/30 bg-error/8"
                    : alert.level === "success"
                      ? "border-tertiary/30 bg-tertiary/8"
                      : "border-outline-variant/15 bg-surface-container-lowest/80"
                }`}
              >
                <p
                  className={`font-label text-xs font-bold uppercase tracking-[0.22em] ${
                    alert.level === "warning"
                      ? "text-error"
                      : alert.level === "success"
                        ? "text-tertiary"
                        : "text-primary"
                  }`}
                >
                  {alert.title}
                </p>
                <p className="mt-2 text-sm text-on-surface">{alert.detail}</p>
              </div>
            ))}
            <div className="rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-lowest/80 p-4">
              <p className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Latest play
              </p>
              <p className="mt-2 text-sm text-on-surface">
                {latestHubItem?.text ?? "Live event updates are ready for the demo."}
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
