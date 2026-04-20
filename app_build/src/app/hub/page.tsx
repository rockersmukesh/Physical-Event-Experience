"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import VenueIcon from "@/components/VenueIcon";
import type { HubEvent, LiveGameStateView } from "@/lib/stadium-data";

type PollVotes = Record<string, string>;

export default function LiveEventHub() {
  const [score, setScore] = useState<LiveGameStateView | null>(null);
  const [feed, setFeed] = useState<HubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollVotes, setPollVotes] = useState<PollVotes>({});

  useEffect(() => {
    let cancelled = false;

    async function loadFeed() {
      try {
        const response = await fetch("/api/hub");

        if (!response.ok) {
          throw new Error("Failed to load live hub");
        }

        const data = (await response.json()) as {
          events: HubEvent[];
          gameState: LiveGameStateView;
        };

        if (!cancelled) {
          setFeed(data.events);
          setScore(data.gameState);
          setError(null);
        }
      } catch (caughtError) {
        console.error("Unable to load live hub from the demo database:", caughtError);
        if (!cancelled) {
          setError("The live hub is unavailable. Check the seeded demo data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFeed();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleVote = (pollId: string, option: string) => {
    setPollVotes((previous) => ({ ...previous, [pollId]: option }));
  };

  const updateCount = useMemo(
    () => feed.filter((item) => item.type === "update" || item.type === "play").length,
    [feed],
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col p-4 pt-8 sm:p-6 sm:pt-10 lg:p-8 lg:pt-12"
    >
      <header className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 font-label text-sm uppercase tracking-widest text-primary">
            Real-time coordination
          </p>
          <h1 className="font-headline text-4xl font-black uppercase text-on-surface">Live Hub</h1>
        </div>
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low px-5 py-3">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            Venue sync
          </p>
          <p className="mt-1 font-headline text-lg font-bold uppercase text-on-surface">
            {error ? "Connection issue" : "Live feed active"}
          </p>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-6 overflow-hidden pb-4 lg:grid-cols-3">
        <section className="flex flex-col gap-6 lg:col-span-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-outline-variant/15 bg-[linear-gradient(135deg,_var(--color-surface-container-high),_var(--color-surface-container-lowest))] p-8 shadow-2xl"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-tertiary to-error"></div>

            {score ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {score.periodLabel}
                  </span>
                  <span className="animate-pulse rounded-full border border-error/50 bg-error/20 px-3 py-1 font-label text-[10px] font-black uppercase tracking-wider text-error">
                    {score.clock}
                  </span>
                </div>

                <div className="mb-8 flex items-center justify-between">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-surface-container-lowest">
                      <span className="font-headline text-xl font-black text-primary">
                        {score.homeTeam.slice(0, 1)}
                      </span>
                    </div>
                    <h2 className="font-headline text-sm font-bold text-on-surface">{score.homeTeam}</h2>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-headline text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(173,199,255,0.4)]">
                      {score.homeScore}
                    </span>
                    <span className="font-headline text-2xl font-black text-on-surface-variant">-</span>
                    <span className="font-headline text-5xl font-black text-on-surface">
                      {score.awayScore}
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-outline-variant/50 bg-surface-container-lowest">
                      <span className="font-headline text-xl font-black text-on-surface-variant">
                        {score.awayTeam.slice(0, 1)}
                      </span>
                    </div>
                    <h2 className="font-headline text-sm font-bold text-on-surface">{score.awayTeam}</h2>
                  </div>
                </div>

                <div className="space-y-4 border-t border-outline-variant/20 pt-6">
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-bold uppercase text-on-surface-variant">
                      <span>Possession</span>
                      <span className="text-primary">{score.possessionPct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded bg-surface-container-lowest">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score.possessionPct}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-4">
                      <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                        Feed items
                      </p>
                      <p className="mt-2 font-headline text-3xl font-black text-on-surface">
                        {feed.length}
                      </p>
                    </div>
                    <div className="rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-4">
                      <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                        Actionable updates
                      </p>
                      <p className="mt-2 font-headline text-3xl font-black text-tertiary">
                        {updateCount}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-on-surface-variant">
                {loading ? "Loading live scoreboard..." : error ?? "No live game state found."}
              </div>
            )}
          </motion.div>
        </section>

        <section className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-low shadow-xl lg:col-span-2">
          <div className="relative z-20 flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-highest p-6">
            <h3 className="font-headline text-lg font-bold uppercase text-on-surface">
              Live Play-by-Play
            </h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary shadow-[0_0_8px_var(--color-tertiary)]"></span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                {error ? "Database issue" : "DB synced"}
              </span>
            </div>
          </div>

          <div className="relative flex-1 overflow-y-auto p-8">
            <div className="absolute bottom-8 left-[59px] top-8 -z-10 w-[2px] bg-outline-variant/20"></div>

            <div className="space-y-8">
              {loading ? (
                <div className="mt-12 text-center font-label uppercase tracking-widest text-on-surface-variant">
                  Connecting to the live venue feed...
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-error/30 bg-error/8 p-6 text-sm text-on-surface">
                  {error}
                </div>
              ) : (
                feed.map((item, index) => {
                  const selectedOption = pollVotes[item.id];
                  const options = item.pollOptions ?? ["Option A", "Option B"];

                  return (
                    <motion.article
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={item.id}
                      className="group relative z-10 flex gap-6"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-surface-container-low shadow-sm ${
                            item.type === "poll"
                              ? "bg-error text-on-primary"
                              : item.type === "update"
                                ? "bg-tertiary text-on-primary"
                                : "bg-primary text-on-primary"
                          }`}
                        >
                          <VenueIcon name={item.icon} className="text-[1.25rem]" />
                        </div>
                      </div>

                      <div className="flex-1 rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-5 transition-colors group-hover:border-primary/30">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">
                            {item.type}
                          </span>
                          <span className="font-label text-xs font-medium text-on-surface-variant">
                            {new Intl.DateTimeFormat("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            }).format(new Date(item.createdAt))}
                          </span>
                        </div>
                        <p className="font-body text-base leading-relaxed text-on-surface">{item.text}</p>

                        {item.type === "poll" ? (
                          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {options.map((option, optionIndex) => {
                              const isActive = selectedOption === option;
                              const percentage = optionIndex === 0 ? "45%" : "55%";

                              return (
                                <motion.button
                                  key={option}
                                  type="button"
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleVote(item.id, option)}
                                  className={`flex justify-between rounded-lg border px-4 py-3 font-label text-sm font-bold tracking-widest transition ${
                                    isActive
                                      ? "border-primary bg-primary/20 text-primary shadow-[inset_0_0_15px_rgba(173,199,255,0.2)]"
                                      : "border-outline-variant/20 bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                                  }`}
                                >
                                  <span>{option}</span>
                                  <span className={isActive ? "text-primary" : "text-on-surface-variant"}>
                                    {selectedOption ? percentage : "--"}
                                  </span>
                                </motion.button>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    </motion.article>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
