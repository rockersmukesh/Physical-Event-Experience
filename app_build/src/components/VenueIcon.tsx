export type IconName =
  | "account_balance_wallet"
  | "admin_panel_settings"
  | "arrow_forward"
  | "broadcast_on_personal"
  | "confirmation_number"
  | "exit_to_app"
  | "explore"
  | "fastfood"
  | "grid_view"
  | "home"
  | "how_to_vote"
  | "local_bar"
  | "lunch_dining"
  | "notifications_active"
  | "shopping_bag"
  | "shopping_basket"
  | "sports_bar"
  | "sports_basketball"
  | "stadium"
  | "verified"
  | "warning"
  | "wc";

type VenueIconProps = {
  name: IconName;
  className?: string;
};

const iconClassName = "inline-block h-[1em] w-[1em] shrink-0 align-middle";

export default function VenueIcon({ name, className = "" }: VenueIconProps) {
  const resolvedClassName = `${iconClassName} ${className}`.trim();

  switch (name) {
    case "account_balance_wallet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h10A2.5 2.5 0 0 1 18 7.5V8h1.5A1.5 1.5 0 0 1 21 9.5v7a1.5 1.5 0 0 1-1.5 1.5H5.5A2.5 2.5 0 0 1 3 15.5z" />
          <path d="M18 8v8" />
          <circle cx="16.5" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "admin_panel_settings":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M12 3 4 6v5c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6z" />
          <path d="M9.5 12.5 11 14l3.5-4" />
        </svg>
      );
    case "arrow_forward":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "broadcast_on_personal":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <rect x="6" y="5" width="12" height="14" rx="2" />
          <path d="M10 2a6 6 0 0 0-4 5M14 2a6 6 0 0 1 4 5" />
          <path d="M9.5 15h5" />
        </svg>
      );
    case "confirmation_number":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" />
          <path d="M9 9h6M9 15h2" />
        </svg>
      );
    case "exit_to_app":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M13 5h6v14h-6" />
          <path d="M10 17 5 12l5-5" />
          <path d="M5 12h11" />
        </svg>
      );
    case "explore":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="m15.5 8.5-2.3 6.1-6.1 2.3 2.3-6.1z" />
        </svg>
      );
    case "fastfood":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M4 14h11a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4Z" />
          <path d="M4 14v3h11v-3M18 6v11M15.5 6v5M20.5 6v5" />
        </svg>
      );
    case "grid_view":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={resolvedClassName} aria-hidden="true">
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="m4 11 8-6 8 6" />
          <path d="M6 10.5V19h12v-8.5" />
          <path d="M10 19v-5h4v5" />
        </svg>
      );
    case "how_to_vote":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="m9 12 2 2 4-4" />
          <path d="M5 5h10l4 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "local_bar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M6 4h12l-5 7v6l-2 1v-7z" />
        </svg>
      );
    case "lunch_dining":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M6 4v7M9 4v7M7.5 11v9" />
          <path d="M16 4c-2.2 0-4 1.8-4 4v5h4v7" />
        </svg>
      );
    case "notifications_active":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M12 4a4 4 0 0 0-4 4v2.5c0 1.1-.4 2.2-1.2 3L5 15h14l-1.8-1.5a4.7 4.7 0 0 1-1.2-3V8a4 4 0 0 0-4-4Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
          <path d="M4 8A8 8 0 0 1 8 3M20 8a8 8 0 0 0-4-5" />
        </svg>
      );
    case "shopping_bag":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M6 8h12l-1 11H7z" />
          <path d="M9 9V7a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "shopping_basket":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="m5 10 2 9h10l2-9Z" />
          <path d="m9 10 3-5 3 5M9 14h6" />
        </svg>
      );
    case "sports_bar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M7 4h10l-4 6v4l-2 1V10z" />
          <path d="M9 20h6" />
        </svg>
      );
    case "sports_basketball":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16M4 12h16" />
        </svg>
      );
    case "stadium":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M4 18h16" />
          <path d="M6 18v-6l6-3 6 3v6" />
          <path d="M8 10V6h8v4" />
          <path d="M10 18v-3h4v3" />
        </svg>
      );
    case "verified":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="m12 3 2.6 1.7 3.1-.1 1 2.9 2.4 2-.9 3 1 3-2.4 2-1 2.9-3.1-.1L12 21l-2.6-1.7-3.1.1-1-2.9-2.4-2 1-3-.9-3 2.4-2 1-2.9 3.1.1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "warning":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <path d="M12 4 3.5 19h17z" />
          <path d="M12 9v4M12 16h.01" />
        </svg>
      );
    case "wc":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={resolvedClassName} aria-hidden="true">
          <circle cx="8" cy="5" r="1.7" />
          <circle cx="16" cy="5" r="1.7" />
          <path d="M8 8v5m0 0-2 7m2-7 2 7m-5-8h6M16 8v4m0 4v4m-2-8h4" />
        </svg>
      );
    default:
      return null;
  }
}
