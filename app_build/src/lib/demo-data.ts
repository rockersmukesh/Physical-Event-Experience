import { cache } from "react";
import type { PrismaClient } from "@prisma/client";
import type { IconName } from "@/components/VenueIcon";
import { getDb } from "@/lib/db";
import type {
  HubEvent,
  LiveGameStateView,
  MenuItem,
  OrderItemInput,
  OrderReceipt,
  TicketView,
  VenueAlert,
  VenueWaitPoint,
} from "@/lib/stadium-data";

function requireDb(): PrismaClient {
  const db = getDb();

  if (!db) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return db;
}

const getDemoUser = cache(async () => {
  const db = requireDb();

  const user = await db.user.findFirst({
    where: { role: "ATTENDEE" },
    orderBy: { createdAt: "asc" },
  });

  if (!user) {
    throw new Error("No attendee user found. Seed the database before running the demo.");
  }

  return user;
});

const getPrimaryTicketRecord = cache(async () => {
  const db = requireDb();
  const user = await getDemoUser();

  const ticket = await db.ticket.findFirst({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },
    orderBy: { createdAt: "asc" },
  });

  if (!ticket) {
    throw new Error("No active ticket found for the demo attendee.");
  }

  return { ticket, user };
});

export async function getTicketView(): Promise<TicketView> {
  const { ticket, user } = await getPrimaryTicketRecord();

  return {
    id: ticket.id,
    eventName: ticket.eventName,
    venueName: ticket.venueName,
    eventStart: ticket.eventStart.toISOString(),
    section: ticket.section,
    row: ticket.row,
    seat: ticket.seat,
    gate: ticket.gate,
    qrCode: ticket.qrCode,
    status: ticket.status,
    attendeeName: user.name,
    attendeeEmail: user.email,
  };
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const db = requireDb();

  const items = await db.menuItem.findMany({
    orderBy: [{ inStock: "desc" }, { category: "asc" }, { name: "asc" }],
  });

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category as MenuItem["category"],
    prepTime: item.prepTime,
    icon: item.icon as IconName,
    inStock: item.inStock,
  }));
}

export async function getVenueMapData(): Promise<{
  alerts: VenueAlert[];
  waitPoints: VenueWaitPoint[];
}> {
  const db = requireDb();

  const [waitPoints, alerts] = await Promise.all([
    db.venueWaitPoint.findMany({
      orderBy: [{ isRecommended: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
    }),
    db.venueAlert.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  return {
    waitPoints: waitPoints.map((point) => ({
      id: point.id,
      name: point.name,
      category: point.category as VenueWaitPoint["category"],
      waitMinutes: point.waitMinutes,
      travelMinutes: point.travelMinutes,
      zone: point.zone,
      status: point.status as VenueWaitPoint["status"],
      icon: point.icon as IconName,
      routeHint: point.routeHint,
      isRecommended: point.isRecommended,
    })),
    alerts: alerts.map((alert) => ({
      id: alert.id,
      title: alert.title,
      detail: alert.detail,
      level: alert.level as VenueAlert["level"],
      icon: alert.icon as IconName,
      ctaLabel: alert.ctaLabel ?? undefined,
      ctaTargetId: alert.ctaTargetId ?? undefined,
    })),
  };
}

export async function getGameState(): Promise<LiveGameStateView> {
  const db = requireDb();

  const state = await db.liveGameState.findUnique({
    where: { label: "primary" },
  });

  if (!state) {
    throw new Error("No live game state found. Seed the database before running the demo.");
  }

  return {
    homeTeam: state.homeTeam,
    awayTeam: state.awayTeam,
    homeScore: state.homeScore,
    awayScore: state.awayScore,
    periodLabel: state.periodLabel,
    clock: state.clock,
    possessionPct: state.possessionPct,
  };
}

export async function getHubEvents(): Promise<HubEvent[]> {
  const db = requireDb();

  const events = await db.hubEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return events.map((event) => {
    const pollOptions =
      Array.isArray(event.pollOptions) && event.pollOptions.length >= 2
        ? ([String(event.pollOptions[0]), String(event.pollOptions[1])] as [string, string])
        : undefined;

    return {
      id: event.id,
      type: event.type as HubEvent["type"],
      text: event.text,
      createdAt: event.createdAt.toISOString(),
      icon: event.icon as IconName,
      pollOptions,
    };
  });
}

export async function createOrder(input: {
  fulfillmentMode: "pickup" | "seat";
  items: OrderItemInput[];
}): Promise<OrderReceipt> {
  const db = requireDb();
  const user = await getDemoUser();
  const ticketView = await getTicketView();

  if (input.items.length === 0) {
    throw new Error("Cannot create an order with an empty cart.");
  }

  const requestedItems = input.items.filter((item) => item.quantity > 0);
  const ids = requestedItems.map((item) => item.menuItemId);

  const menuItems = await db.menuItem.findMany({
    where: {
      id: { in: ids },
      inStock: true,
    },
  });

  if (menuItems.length !== ids.length) {
    throw new Error("One or more selected menu items are unavailable.");
  }

  const quantityById = new Map(requestedItems.map((item) => [item.menuItemId, item.quantity]));
  const total = menuItems.reduce(
    (sum, item) => sum + item.price * (quantityById.get(item.id) ?? 0),
    0,
  );

  const etaMinutes = input.fulfillmentMode === "pickup" ? 6 : 14;
  const order = await db.order.create({
    data: {
      userId: user.id,
      status: input.fulfillmentMode === "pickup" ? "READY" : "PREPARING",
      total,
      fulfillmentMode: input.fulfillmentMode,
      etaMinutes,
      pickupZone: input.fulfillmentMode === "pickup" ? "Burger Stand C • Pickup Shelf" : null,
      seatLabel:
        input.fulfillmentMode === "seat"
          ? `Section ${ticketView.section}, Row ${ticketView.row}, Seat ${ticketView.seat}`
          : null,
      items: {
        create: menuItems.map((item) => ({
          menuItemId: item.id,
          quantity: quantityById.get(item.id) ?? 0,
        })),
      },
    },
  });

  return {
    id: order.id,
    status: order.status,
    total: order.total,
    fulfillmentMode: order.fulfillmentMode as OrderReceipt["fulfillmentMode"],
    etaMinutes: order.etaMinutes,
    pickupZone: order.pickupZone,
    seatLabel: order.seatLabel,
    createdAt: order.createdAt.toISOString(),
  };
}

export async function getDashboardData() {
  const [ticket, gameState, mapData, hubEvents, menuItems] = await Promise.all([
    getTicketView(),
    getGameState(),
    getVenueMapData(),
    getHubEvents(),
    getMenuItems(),
  ]);

  return {
    ticket,
    gameState,
    alerts: mapData.alerts,
    waitPoints: mapData.waitPoints,
    hubEvents,
    menuItems,
  };
}
