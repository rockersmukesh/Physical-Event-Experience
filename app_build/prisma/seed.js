const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const attendee = await prisma.user.upsert({
    where: { email: "alex.mercer@stadiumpulse.demo" },
    update: {
      name: "Alex Mercer",
      role: "ATTENDEE",
    },
    create: {
      email: "alex.mercer@stadiumpulse.demo",
      name: "Alex Mercer",
      role: "ATTENDEE",
    },
  });

  await prisma.orderItem.deleteMany({
    where: {
      order: {
        userId: attendee.id,
      },
    },
  });

  await prisma.order.deleteMany({
    where: { userId: attendee.id },
  });

  await prisma.ticket.upsert({
    where: { qrCode: "SCAN-AT-GATE-B" },
    update: {
      userId: attendee.id,
      eventName: "Championship Finals",
      venueName: "Apex Arena",
      eventStart: new Date("2026-10-24T19:30:00-04:00"),
      section: "114",
      row: "G",
      seat: "23",
      gate: "B",
      status: "ACTIVE",
    },
    create: {
      userId: attendee.id,
      eventName: "Championship Finals",
      venueName: "Apex Arena",
      eventStart: new Date("2026-10-24T19:30:00-04:00"),
      section: "114",
      row: "G",
      seat: "23",
      gate: "B",
      qrCode: "SCAN-AT-GATE-B",
      status: "ACTIVE",
    },
  });

  const menuItems = [
    {
      id: "menu-hotdog",
      name: "Stadium Hot Dog",
      price: 8,
      category: "Food",
      prepTime: "5 min",
      icon: "lunch_dining",
      inStock: true,
    },
    {
      id: "menu-ipa",
      name: "Craft IPA Pint",
      price: 12,
      category: "Drinks",
      prepTime: "2 min",
      icon: "sports_bar",
      inStock: true,
    },
    {
      id: "menu-nachos",
      name: "Loaded Nachos",
      price: 10.5,
      category: "Food",
      prepTime: "8 min",
      icon: "fastfood",
      inStock: true,
    },
    {
      id: "menu-soda",
      name: "Sparkling Citrus Soda",
      price: 5.5,
      category: "Drinks",
      prepTime: "1 min",
      icon: "local_bar",
      inStock: true,
    },
    {
      id: "menu-burger",
      name: "Double Smash Burger",
      price: 14,
      category: "Food",
      prepTime: "6 min",
      icon: "fastfood",
      inStock: true,
    },
    {
      id: "menu-water",
      name: "Still Water",
      price: 4,
      category: "Drinks",
      prepTime: "1 min",
      icon: "local_bar",
      inStock: true,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  const waitPoints = [
    {
      id: "restroom-north",
      name: "Restroom North",
      category: "restrooms",
      waitMinutes: 2,
      travelMinutes: 3,
      zone: "Level 2 • Aisle 3",
      status: "Clear",
      icon: "wc",
      routeHint: "Use the upper concourse ramp from Section 114.",
      sortOrder: 1,
      isRecommended: false,
    },
    {
      id: "restroom-east",
      name: "Restrooms East",
      category: "restrooms",
      waitMinutes: 12,
      travelMinutes: 4,
      zone: "Level 2 • Aisle 8",
      status: "Busy",
      icon: "wc",
      routeHint: "Detour via Section 110 to skip the halftime rush.",
      sortOrder: 2,
      isRecommended: false,
    },
    {
      id: "burger-stand-c",
      name: "Burger Stand C",
      category: "concessions",
      waitMinutes: 4,
      travelMinutes: 2,
      zone: "Level 1 • Aisle 4",
      status: "Clear",
      icon: "fastfood",
      routeHint: "Pickup lane is open for mobile orders.",
      sortOrder: 3,
      isRecommended: false,
    },
    {
      id: "merch-stand",
      name: "Merch Stand",
      category: "concessions",
      waitMinutes: 18,
      travelMinutes: 6,
      zone: "Club Level • South",
      status: "Busy",
      icon: "shopping_bag",
      routeHint: "Wait until the quarter break ends or use the North pop-up cart.",
      sortOrder: 4,
      isRecommended: false,
    },
    {
      id: "gate-b",
      name: "Gate B Entry",
      category: "exits",
      waitMinutes: 6,
      travelMinutes: 5,
      zone: "Sector B",
      status: "Moderate",
      icon: "stadium",
      routeHint: "Stay on the east plaza path for the shortest screening time.",
      sortOrder: 5,
      isRecommended: false,
    },
    {
      id: "gate-c",
      name: "Gate C Express",
      category: "exits",
      waitMinutes: 1,
      travelMinutes: 7,
      zone: "Sector C",
      status: "Clear",
      icon: "exit_to_app",
      routeHint: "Use the outdoor escalator to save 5 minutes versus South Corridor.",
      sortOrder: 6,
      isRecommended: true,
    },
  ];

  for (const point of waitPoints) {
    await prisma.venueWaitPoint.upsert({
      where: { id: point.id },
      update: point,
      create: point,
    });
  }

  await prisma.venueAlert.deleteMany({});

  await prisma.venueAlert.createMany({
    data: [
      {
        title: "Avoid South Corridor",
        detail: "Severe congestion due to a spill. Sector C escalators are currently the fastest path.",
        level: "warning",
        icon: "warning",
        ctaLabel: "Reroute Me →",
        ctaTargetId: "gate-c",
        sortOrder: 1,
      },
      {
        title: "VIP Entry Open",
        detail: "Gate A VIP lanes are fully open with zero wait right now.",
        level: "success",
        icon: "stadium",
        ctaLabel: "Focus Gate B",
        ctaTargetId: "gate-b",
        sortOrder: 2,
      },
    ],
  });

  await prisma.liveGameState.upsert({
    where: { label: "primary" },
    update: {
      homeTeam: "Home",
      awayTeam: "Away",
      homeScore: 82,
      awayScore: 78,
      periodLabel: "Quarter 4",
      clock: "12:05",
      possessionPct: 62,
    },
    create: {
      label: "primary",
      homeTeam: "Home",
      awayTeam: "Away",
      homeScore: 82,
      awayScore: 78,
      periodLabel: "Quarter 4",
      clock: "12:05",
      possessionPct: 62,
    },
  });

  await prisma.hubEvent.deleteMany({});

  await prisma.hubEvent.createMany({
    data: [
      {
        type: "play",
        text: "Mercer hits a deep 3-pointer and the East concourse erupts.",
        icon: "sports_basketball",
        createdAt: new Date("2026-10-24T19:11:00-04:00"),
      },
      {
        type: "update",
        text: "Gate B security lines are easing. East entry is now 5 minutes faster than West Gate.",
        icon: "notifications_active",
        createdAt: new Date("2026-10-24T19:09:00-04:00"),
      },
      {
        type: "poll",
        text: "Who takes the final shot?",
        icon: "how_to_vote",
        pollOptions: ["Mercer", "Diaz"],
        createdAt: new Date("2026-10-24T19:08:00-04:00"),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
