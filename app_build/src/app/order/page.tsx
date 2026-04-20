"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VenueIcon from "@/components/VenueIcon";
import type { FulfillmentMode, MenuItem, OrderReceipt } from "@/lib/stadium-data";

type CartItem = MenuItem & { qty: number };
type MenuFilter = "All Items" | "Food" | "Drinks";

const fulfillmentModes: {
  id: FulfillmentMode;
  label: string;
  eta: string;
  detail: string;
}[] = [
  {
    id: "pickup",
    label: "Express Pickup",
    eta: "6 min",
    detail: "Skip the main line with the dedicated mobile pickup shelf at Burger Stand C.",
  },
  {
    id: "seat",
    label: "In-Seat Delivery",
    eta: "14 min",
    detail: "Delivered directly to Section 114, Row G, Seat 23 for the live demo flow.",
  },
];

const menuFilters: MenuFilter[] = ["All Items", "Food", "Drinks"];

export default function ExpressOrder() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<FulfillmentMode>("pickup");
  const [menuFilter, setMenuFilter] = useState<MenuFilter>("All Items");
  const [latestOrder, setLatestOrder] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const response = await fetch("/api/menu");

        if (!response.ok) {
          throw new Error("Failed to load menu");
        }

        const data = (await response.json()) as MenuItem[];

        if (!cancelled) {
          setMenu(data);
          setError(null);
        }
      } catch (caughtError) {
        console.error("Unable to load menu from the demo database:", caughtError);
        if (!cancelled) {
          setError("Venue menu is unavailable. Check the database connection and seed data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filteredMenu = useMemo(() => {
    if (menuFilter === "All Items") {
      return menu;
    }

    return menu.filter((item) => item.category === menuFilter);
  }, [menu, menuFilter]);

  const addToCart = (item: MenuItem) => {
    setCart((previous) => {
      const existing = previous.find((entry) => entry.id === item.id);

      if (existing) {
        return previous.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
        );
      }

      return [...previous, { ...item, qty: 1 }];
    });

    setToast(`Added ${item.name} to cart`);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const selectedMode = fulfillmentModes.find((item) => item.id === mode) ?? fulfillmentModes[0];

  async function handleCheckout() {
    if (cart.length === 0 || submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fulfillmentMode: mode,
          items: cart.map((item) => ({ menuItemId: item.id, quantity: item.qty })),
        }),
      });

      const payload = (await response.json()) as OrderReceipt | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "Failed to create order");
      }

      setLatestOrder(payload);
      setCart([]);
      setToast(
        payload.fulfillmentMode === "pickup"
          ? `Order ${payload.id.slice(0, 8)} is ready for pickup`
          : `Order ${payload.id.slice(0, 8)} is on the way to your seat`,
      );
    } catch (caughtError) {
      console.error("Unable to create demo order:", caughtError);
      setError(caughtError instanceof Error ? caughtError.message : "Failed to create order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col p-4 pt-8 sm:p-6 sm:pt-10 lg:p-8 lg:pt-12"
    >
      <header className="mb-6 space-y-4 lg:mb-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 font-label text-sm uppercase tracking-widest text-primary">
              Queue-aware concessions
            </p>
            <h1 className="font-headline text-4xl font-black uppercase text-on-surface">
              Express Order
            </h1>
          </div>
          <div className="rounded-full border border-outline-variant/20 bg-surface-container-low px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-on-surface-variant">
            Connected to Neon demo data
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {fulfillmentModes.map((option) => {
            const active = option.id === mode;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-primary bg-primary/10 shadow-[0_0_25px_rgba(173,199,255,0.15)]"
                    : "border-outline-variant/20 bg-surface-container-low"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-headline text-lg font-bold uppercase text-on-surface">
                      {option.label}
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant">{option.detail}</p>
                  </div>
                  <div className="rounded-full border border-outline-variant/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-tertiary">
                    {option.eta}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </header>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="absolute left-1/2 top-6 z-50 rounded-full bg-primary px-6 py-3 font-label font-bold text-on-primary shadow-[0_5px_20px_rgba(173,199,255,0.4)]"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid flex-1 grid-cols-1 gap-6 overflow-hidden pb-4 lg:grid-cols-3 xl:grid-cols-4">
        <section className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-low shadow-xl lg:col-span-2 xl:col-span-3">
          <div className="flex flex-wrap gap-3 border-b border-outline-variant/15 bg-surface-container-highest px-6 pt-4">
            {menuFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setMenuFilter(filter)}
                className={`border-b-2 pb-3 font-label text-sm font-bold uppercase transition-colors ${
                  menuFilter === filter
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-2">
            {loading ? (
              <div className="col-span-2 py-20 text-center font-label uppercase tracking-widest text-on-surface-variant">
                Loading venue menu...
              </div>
            ) : error ? (
              <div className="col-span-2 rounded-2xl border border-error/30 bg-error/8 p-6 text-sm text-on-surface">
                {error}
              </div>
            ) : (
              filteredMenu.map((item) => (
                <motion.article
                  whileHover={{ scale: item.inStock ? 1.02 : 1 }}
                  whileTap={{ scale: item.inStock ? 0.98 : 1 }}
                  key={item.id}
                  className={`flex items-center justify-between rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-5 transition ${
                    item.inStock ? "cursor-pointer hover:border-primary/40" : "opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/15 bg-surface-container-high text-primary transition">
                      <VenueIcon name={item.icon} className="text-[1.2rem]" />
                    </div>
                    <div>
                      <h2 className="font-body text-lg font-semibold text-on-surface">{item.name}</h2>
                      <p className="mt-1 font-label text-xs uppercase tracking-wider text-tertiary">
                        {item.inStock ? `Ready in ${item.prepTime}` : "Currently unavailable"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="font-headline text-xl font-black text-on-surface">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      disabled={!item.inStock}
                      onClick={() => addToCart(item)}
                      className={`rounded-full px-4 py-1.5 font-label text-xs font-bold uppercase whitespace-nowrap transition ${
                        item.inStock
                          ? "bg-surface-variant text-on-surface hover:bg-primary hover:text-on-primary"
                          : "cursor-not-allowed bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      Add +
                    </button>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </section>

        <aside className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-low shadow-xl">
          <div className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-highest p-6">
            <h3 className="font-headline text-lg font-bold uppercase text-on-surface">Your Cart</h3>
            <motion.span
              key={cart.length}
              initial={{ scale: 1.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="inline-block rounded-full bg-primary/20 px-3 py-1 font-label text-xs font-bold uppercase text-primary"
            >
              {cart.length} Items
            </motion.span>
          </div>

          <div className="border-b border-outline-variant/15 bg-surface-container-lowest p-4">
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              Fulfillment
            </p>
            <p className="mt-1 font-headline text-lg font-bold uppercase text-on-surface">
              {selectedMode.label}
            </p>
            <p className="mt-1 text-sm text-on-surface-variant">
              Estimated completion: {selectedMode.eta}
            </p>
          </div>

          {latestOrder ? (
            <div className="border-b border-outline-variant/15 bg-primary/8 p-4">
              <p className="font-label text-xs uppercase tracking-widest text-primary">Latest order</p>
              <p className="mt-2 font-headline text-lg font-bold uppercase text-on-surface">
                {latestOrder.id.slice(0, 8)} • {latestOrder.status}
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">
                {latestOrder.fulfillmentMode === "pickup"
                  ? `${latestOrder.pickupZone} • ${latestOrder.etaMinutes} min`
                  : `${latestOrder.seatLabel} • ${latestOrder.etaMinutes} min`}
              </p>
            </div>
          ) : null}

          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            <AnimatePresence>
              {cart.length === 0 ? (
                <motion.div
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col items-center justify-center text-on-surface-variant opacity-60"
                >
                  <VenueIcon name="shopping_basket" className="mb-2 text-4xl" />
                  <p className="font-headline text-sm uppercase">Cart is empty</p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-body text-sm font-semibold text-on-surface">{item.name}</p>
                      <p className="mt-0.5 font-label text-xs text-on-surface-variant">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <p className="font-headline font-bold text-on-surface">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-outline-variant/15 bg-surface-container-lowest p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-headline text-sm font-bold uppercase text-on-surface-variant">
                Total
              </span>
              <motion.span
                key={total}
                initial={{ scale: 1.2, color: "var(--color-primary)" }}
                animate={{ scale: 1, color: "var(--color-on-surface)" }}
                className="font-headline text-2xl font-black"
              >
                ${total.toFixed(2)}
              </motion.span>
            </div>
            <motion.button
              type="button"
              whileHover={cart.length > 0 ? { scale: 1.02 } : {}}
              whileTap={cart.length > 0 ? { scale: 0.98 } : {}}
              disabled={cart.length === 0 || submitting}
              onClick={handleCheckout}
              className={`w-full rounded-xl py-4 font-label text-sm font-black uppercase tracking-widest transition-all ${
                cart.length > 0 && !submitting
                  ? "bg-primary text-on-primary shadow-[0_0_20px_rgba(173,199,255,0.3)] hover:opacity-90"
                  : "cursor-not-allowed bg-surface-variant text-on-surface-variant"
              }`}
            >
              {submitting ? "Placing order..." : `Checkout for ${selectedMode.label}`}
            </motion.button>
          </div>
        </aside>
      </div>
    </motion.main>
  );
}
