// ─── DEMO DATA ────────────────────────────────────────────────────────────────
// All data is hardcoded for demo/presentation purposes only.
// No backend, no API, no authentication required.

export const client = {
  id: "red-river",
  name: "Red River Restaurants",
  logo: "https://rivastrategies.com/red-river-cadence/red-river-logo.png",
  industry: "Hospitality",
  status: "Active" as const,
  contactName: "General Manager",
  contactEmail: "gm@redriverrestaurants.com",
  website: "redriverrestaurants.com",
  established: 2002,
  mrr: 3200,
  services: ["Revenue Systems", "Operational Efficiency"],
  locations: [
    { name: "League City — Cantina + BBQ", type: "flagship" },
    { name: "Richmond — BBQ", type: "standard" },
    { name: "Katy — Cantina", type: "standard" },
  ],
  tools: ["monday.com", "Hootsuite", "Toast / DoorDash"],
  concepts: ["Cantina", "BBQ"],
  notes:
    "Cantina follows structured weekly cadence. BBQ locations are more flexible with daily content. Monthly on-site content capture system TBD for Q2. Katy location runs Friday events periodically.",
};

export const engagement = {
  id: "eng-001",
  name: "Social Media & Revenue Systems",
  servicePillar: "Revenue Systems",
  pillarEmoji: "📈",
  startDate: "March 1, 2025",
  status: "Active" as const,
  progress: 33,
  milestones: [
    {
      id: 1,
      name: "Weekly Marketing Cadence Framework Built",
      status: "complete" as const,
      dueDate: "March 15, 2025",
      completedDate: "March 15, 2025",
    },
    {
      id: 2,
      name: "Content Calendar — April Rollout",
      status: "in-progress" as const,
      dueDate: "April 30, 2025",
      completedDate: null,
    },
    {
      id: 3,
      name: "Monthly On-Site Content Capture System",
      status: "upcoming" as const,
      dueDate: "May 20, 2025",
      completedDate: null,
    },
  ],
};

export const documents = [
  {
    id: "doc-001",
    title: "Red River — Weekly Marketing Cadence (Master)",
    category: "SOP",
    date: "March 15, 2025",
    size: "1.2 MB",
  },
  {
    id: "doc-002",
    title: "April Content Calendar — All Locations",
    category: "Roadmap",
    date: "April 1, 2025",
    size: "840 KB",
  },
  {
    id: "doc-003",
    title: "Q1 Engagement Report",
    category: "Report",
    date: "April 5, 2025",
    size: "2.4 MB",
  },
];

export const messages = [
  {
    id: "msg-001",
    from: "riva",
    senderName: "Riva Team",
    senderInitial: "R",
    timestamp: "April 7, 2025 · 10:14 AM",
    body: "Hey team — the weekly cadence framework is locked in. Monday.com board has been updated with April tasks. Daily stories must have zero gaps starting this week. Let's get the April content calendar finalized by EOW.",
    read: true,
  },
  {
    id: "msg-002",
    from: "client",
    senderName: "Red River GM",
    senderInitial: "GM",
    timestamp: "April 7, 2025 · 12:03 PM",
    body: "Got it — we'll have the GMs send over any in-store moments or staff highlights by Thursday. Katy location has an event this Friday we want to push.",
    read: true,
  },
];

export const tasks = [
  {
    id: "task-001",
    title: "Schedule April content in Hootsuite",
    dueDate: "Apr 18",
    priority: "High" as const,
    status: "pending" as const,
    client: "Red River Restaurants",
  },
  {
    id: "task-002",
    title: "Coordinate on-site shoot — League City",
    dueDate: "Apr 25",
    priority: "Medium" as const,
    status: "pending" as const,
    client: "Red River Restaurants",
  },
  {
    id: "task-003",
    title: "Reply to Google reviews — Richmond location",
    dueDate: "Apr 16",
    priority: "High" as const,
    status: "pending" as const,
    client: "Red River Restaurants",
  },
];

export const activityFeed = [
  {
    id: 1,
    icon: "🚀",
    text: "Weekly Marketing Cadence framework launched for Red River",
    time: "Mar 15",
  },
  {
    id: 2,
    icon: "📄",
    text: "Document uploaded: April Content Calendar — All Locations",
    time: "Apr 1",
  },
  {
    id: 3,
    icon: "💬",
    text: "New message received from Red River GM re: Friday event",
    time: "Apr 7",
  },
  {
    id: 4,
    icon: "⭐",
    text: "Google reviews replied — Richmond & League City locations",
    time: "Apr 10",
  },
  {
    id: 5,
    icon: "📅",
    text: "April content calendar planning started in Hootsuite",
    time: "Apr 12",
  },
];
