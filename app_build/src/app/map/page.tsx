"use client";

import { useEffect, useMemo, useState } from "react";
import VenueIcon, { type IconName } from "@/components/VenueIcon";
import type { VenueAlert, VenueWaitPoint } from "@/lib/stadium-data";

type MapFilter = "all" | "concessions" | "restrooms" | "exits";

const filters: { id: MapFilter; label: string; icon?: IconName }[] = [
  { id: "all", label: "All" },
  { id: "concessions", label: "Concessions", icon: "fastfood" },
  { id: "restrooms", label: "Restrooms", icon: "wc" },
  { id: "exits", label: "Exits", icon: "exit_to_app" },
];

export default function InteractiveVenueMap() {
  const [activeFilter, setActiveFilter] = useState<MapFilter>("restrooms");
  const [recommendedRouteId, setRecommendedRouteId] = useState<string>("");
  const [waitPoints, setWaitPoints] = useState<VenueWaitPoint[]>([]);
  const [alerts, setAlerts] = useState<VenueAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMapData() {
      try {
        const response = await fetch("/api/map");

        if (!response.ok) {
          throw new Error("Failed to load map data");
        }

        const data = (await response.json()) as { alerts: VenueAlert[]; waitPoints: VenueWaitPoint[] };

        if (!cancelled) {
          setWaitPoints(data.waitPoints);
          setAlerts(data.alerts);
          setRecommendedRouteId(
            data.waitPoints.find((point) => point.isRecommended)?.id ?? data.waitPoints[0]?.id ?? "",
          );
        }
      } catch (caughtError) {
        console.error("Unable to load venue map data:", caughtError);
        if (!cancelled) {
          setError("Venue routing data is unavailable.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMapData();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPoints = useMemo(() => {
    if (activeFilter === "all") {
      return waitPoints;
    }

    return waitPoints.filter((point) => point.category === activeFilter);
  }, [activeFilter, waitPoints]);

  const recommendedRoute =
    waitPoints.find((point) => point.id === recommendedRouteId) ??
    waitPoints.find((point) => point.isRecommended) ??
    waitPoints[0];
  const maxWait = waitPoints.length > 0 ? Math.max(...waitPoints.map((point) => point.waitMinutes)) : 0;
  const timeSaved =
    recommendedRoute && maxWait > recommendedRoute.waitMinutes
      ? maxWait - recommendedRoute.waitMinutes
      : 0;

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col p-4 pt-8 sm:p-6 sm:pt-10 lg:p-8 lg:pt-12">
      <header className="mb-6 flex flex-col gap-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 font-label text-sm uppercase tracking-widest text-primary">
            Live crowd movement
          </p>
          <h1 className="font-headline text-4xl font-black uppercase text-on-surface">
            Interactive Map
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-5 py-2 font-label text-sm font-bold uppercase transition ${
                  active
                    ? "border-primary bg-primary text-on-primary shadow-[0_0_15px_rgba(173,199,255,0.4)]"
                    : "border-outline-variant/30 bg-surface-container-low text-on-surface hover:bg-surface-container-highest"
                }`}
              >
                {filter.icon ? <VenueIcon name={filter.icon} className="mr-1 text-[1rem]" /> : null}
                {filter.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl lg:flex-row">
        <section className="relative flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--color-surface-container-high)_0%,_var(--color-background)_100%)]">
          <div className="absolute inset-0 m-16 rounded-[100px] border border-outline-variant/10"></div>
          <div className="absolute inset-0 m-32 rounded-[80px] border-2 border-outline-variant/20"></div>

          <div className="absolute left-[45%] top-[60%]">
            <div className="relative z-10 h-4 w-4 rounded-full bg-primary shadow-[0_0_15px_var(--color-primary)]"></div>
            <div className="absolute left-[-10px] top-[-10px] h-9 w-9 animate-ping rounded-full border border-primary opacity-70"></div>
          </div>

          {waitPoints.slice(0, 2).map((point, index) => (
            <div
              key={point.id}
              className={`absolute flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-highest px-3 py-1.5 shadow-lg backdrop-blur ${
                index === 0 ? "left-[20%] top-[25%]" : "left-[70%] top-[70%]"
              }`}
            >
              <span
                className={`font-headline text-sm font-black ${
                  point.waitMinutes <= 4
                    ? "text-tertiary"
                    : point.waitMinutes <= 10
                      ? "text-primary"
                      : "text-error"
                }`}
              >
                {point.waitMinutes} MIN
              </span>
              <span className="font-body text-xs text-on-surface">{point.name}</span>
            </div>
          ))}

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-primary/20 bg-background/75 p-5 backdrop-blur-xl">
            {recommendedRoute ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    Fastest recommendation
                  </p>
                  <h2 className="mt-1 font-headline text-2xl font-black uppercase text-on-surface">
                    {recommendedRoute.name}
                  </h2>
                  <p className="mt-1 text-sm text-on-surface-variant">{recommendedRoute.routeHint}</p>
                </div>
                <div className="rounded-2xl border border-tertiary/30 bg-tertiary/10 px-4 py-3">
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    Time saved
                  </p>
                  <p className="mt-1 font-headline text-3xl font-black text-tertiary">
                    {timeSaved} min
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant">
                {loading ? "Loading venue routing..." : error ?? "No routing guidance available."}
              </p>
            )}
          </div>
        </section>

        <aside className="w-full border-t border-outline-variant/20 bg-surface-container-low/80 p-6 backdrop-blur-md lg:w-[26rem] lg:border-l lg:border-t-0">
          <h3 className="mb-4 font-headline text-sm font-bold uppercase text-on-surface-variant">
            Live Alerts
          </h3>

          <div className="space-y-4">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`relative overflow-hidden rounded-lg p-4 ${
                    alert.level === "warning"
                      ? "border border-error/40 bg-surface-container-lowest"
                      : alert.level === "success"
                        ? "border border-tertiary/40 bg-surface-container-lowest"
                        : "border border-primary/40 bg-surface-container-lowest"
                  }`}
                >
                  <div
                    className={`absolute bottom-0 left-0 top-0 w-1 ${
                      alert.level === "warning"
                        ? "bg-error shadow-[0_0_8px_var(--color-error)]"
                        : alert.level === "success"
                          ? "bg-tertiary shadow-[0_0_8px_var(--color-tertiary)]"
                          : "bg-primary shadow-[0_0_8px_var(--color-primary)]"
                    }`}
                  ></div>
                  <h4 className="mb-1 flex items-center gap-1.5 font-label text-sm font-bold text-on-surface">
                    <VenueIcon
                      name={alert.icon}
                      className={`text-[1rem] ${
                        alert.level === "warning"
                          ? "text-error"
                          : alert.level === "success"
                            ? "text-tertiary"
                            : "text-primary"
                      }`}
                    />
                    {alert.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant">{alert.detail}</p>
                  {alert.ctaLabel && alert.ctaTargetId ? (
                    <button
                      type="button"
                      onClick={() => setRecommendedRouteId(alert.ctaTargetId ?? "")}
                      className={`mt-3 font-label text-xs font-bold uppercase transition ${
                        alert.level === "warning"
                          ? "text-error hover:text-white"
                          : alert.level === "success"
                            ? "text-tertiary hover:text-white"
                            : "text-primary hover:text-white"
                      }`}
                    >
                      {alert.ctaLabel}
                    </button>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
                {loading ? "Loading live alerts..." : error ?? "No active venue alerts."}
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="mb-4 font-headline text-sm font-bold uppercase text-on-surface-variant">
              Wait Time Snapshot
            </h3>
            <div className="space-y-3">
              {filteredPoints.map((point) => (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setRecommendedRouteId(point.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    recommendedRouteId === point.id
                      ? "border-primary bg-primary/10"
                      : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-headline text-lg font-bold uppercase text-on-surface">
                        {point.name}
                      </p>
                      <p className="mt-1 text-sm text-on-surface-variant">{point.zone}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-headline text-2xl font-black ${
                          point.waitMinutes <= 4
                            ? "text-tertiary"
                            : point.waitMinutes <= 10
                              ? "text-primary"
                              : "text-error"
                        }`}
                      >
                        {point.waitMinutes} min
                      </p>
                      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {point.status}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-on-surface-variant">{point.routeHint}</p>
                </button>
              ))}
              {!loading && filteredPoints.length === 0 ? (
                <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
                  No routing data is available for this category.
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
