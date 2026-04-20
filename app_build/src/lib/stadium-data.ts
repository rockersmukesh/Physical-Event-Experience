import type { IconName } from "@/components/VenueIcon";

export type MenuCategory = "Food" | "Drinks";
export type WaitPointCategory = "all" | "concessions" | "restrooms" | "exits";
export type WaitPointStatus = "Clear" | "Moderate" | "Busy";
export type HubEventType = "play" | "poll" | "update";
export type FulfillmentMode = "pickup" | "seat";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  prepTime: string;
  icon: IconName;
  inStock: boolean;
};

export type HubEvent = {
  id: string;
  type: HubEventType;
  text: string;
  createdAt: string;
  icon: IconName;
  pollOptions?: [string, string];
};

export type VenueWaitPoint = {
  id: string;
  name: string;
  category: WaitPointCategory;
  waitMinutes: number;
  travelMinutes: number;
  zone: string;
  status: WaitPointStatus;
  icon: IconName;
  routeHint: string;
  isRecommended: boolean;
};

export type VenueAlert = {
  id: string;
  title: string;
  detail: string;
  level: "info" | "warning" | "success";
  icon: IconName;
  ctaLabel?: string;
  ctaTargetId?: string;
};

export type TicketView = {
  id: string;
  eventName: string;
  venueName: string;
  eventStart: string;
  section: string;
  row: string;
  seat: string;
  gate: string;
  qrCode: string;
  status: string;
  attendeeName: string;
  attendeeEmail: string;
};

export type LiveGameStateView = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  periodLabel: string;
  clock: string;
  possessionPct: number;
};

export type OrderItemInput = {
  menuItemId: string;
  quantity: number;
};

export type OrderReceipt = {
  id: string;
  status: string;
  total: number;
  fulfillmentMode: FulfillmentMode;
  etaMinutes: number;
  pickupZone?: string | null;
  seatLabel?: string | null;
  createdAt: string;
};
