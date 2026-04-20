"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import VenueIcon from './VenueIcon';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant/20 bg-background/95 px-2 py-3 backdrop-blur-xl">
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-2 rounded-2xl border border-outline-variant/15 bg-surface-container-low/80 p-2 shadow-2xl">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${
            pathname === "/"
              ? "bg-primary/15 text-primary"
              : "text-on-surface-variant"
          }`}
        >
          <VenueIcon name="home" className="text-[1.2rem]" />
          <span>Home</span>
        </Link>
        <Link
          href="/map"
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${
            pathname === "/map"
              ? "bg-primary/15 text-primary"
              : "text-on-surface-variant"
          }`}
        >
          <VenueIcon name="explore" className="text-[1.2rem]" />
          <span>Map</span>
        </Link>
        <Link
          href="/order"
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${
            pathname === "/order"
              ? "bg-primary/15 text-primary"
              : "text-on-surface-variant"
          }`}
        >
          <VenueIcon name="fastfood" className="text-[1.2rem]" />
          <span>Order</span>
        </Link>
        <Link
          href="/hub"
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${
            pathname === "/hub"
              ? "bg-primary/15 text-primary"
              : "text-on-surface-variant"
          }`}
        >
          <VenueIcon name="stadium" className="text-[1.2rem]" />
          <span>Live Hub</span>
        </Link>
      </div>
    </nav>
  );
}
