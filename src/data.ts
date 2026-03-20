export const quickFilters = [
  { label: "Reserve now", icon: "calendar" },
  { label: "Recs Nearby", icon: "heart" },
  { label: "Trending", icon: "trending-up" },
] as const;

export const inviteFeatures = [
  { label: "Custom Guides", icon: "book-open" },
  { label: "Average Scores", icon: "clock" },
  { label: "Dish Search", icon: "search" },
  { label: "Res Priority", icon: "calendar" },
  { label: "Stealth Mode", icon: "eye-off" },
] as const;

export const featuredLists = [
  {
    title: "Top 10 LA Sandwich Shops",
    subtitle: "You have been to 0 of 10",
    color: "#D6B497",
  },
  {
    title: "25 Great Black-Owned LA Spots",
    subtitle: "You have been to 0 of 25",
    color: "#8C6A4D",
  },
  {
    title: "Best Brunch in NYC",
    subtitle: "You have been to 0 of 15",
    color: "#7390A8",
  },
  {
    title: "Seattle Happy Hour Heroes",
    subtitle: "You have been to 1 of 18",
    color: "#6A7B61",
  },
  {
    title: "Date Night in Atlanta",
    subtitle: "You have been to 0 of 12",
    color: "#925E5A",
  },
  {
    title: "Tokyo Late-Night Noodles",
    subtitle: "You have been to 2 of 20",
    color: "#6A5A8C",
  },
] as const;

export const feedPosts = [
  {
    user: "Steph",
    restaurant: "Salty Blue",
    score: "7.5",
    location: "Downtown Renton, Renton, WA",
    visitText: "1 visit",
    notes:
      "Delish, but the price is steep. Front of house called me psycho for asking for ketchup.",
    timestamp: "51 minutes ago",
    initials: "ST",
    avatarColor: "#E8D4C8",
  },
  {
    user: "Maddie",
    restaurant: "Cafe Lune",
    score: "8.9",
    location: "Capitol Hill, Seattle, WA",
    visitText: "2 visits",
    notes: "Go for the honey toast and stay for the patio. Perfect low-key brunch spot.",
    timestamp: "2 hours ago",
    initials: "MA",
    avatarColor: "#D6C5E5",
  },
  {
    user: "Dylan",
    restaurant: "Hanuman Thai Eatery",
    score: "9.4",
    location: "Newport Beach, CA",
    visitText: "4 visits",
    notes: "The crispy pork stole the show. Service was fast even on a packed night.",
    timestamp: "Yesterday",
    initials: "DY",
    avatarColor: "#BFD6E5",
  },
  {
    user: "Pearl",
    restaurant: "Pelican Cafe",
    score: "9.1",
    location: "Taito City, Japan",
    visitText: "1 visit",
    notes: "Small menu, zero misses. Worth an early wake-up if you are nearby.",
    timestamp: "2 days ago",
    initials: "PS",
    avatarColor: "#D8E1B8",
  },
] as const;

export const restaurantActions = [
  { label: "Website", icon: "globe" },
  { label: "Call", icon: "phone" },
  { label: "Directions", icon: "navigation" },
] as const;

export const restaurantScores = [
  {
    label: "Rec Score",
    description: "How much we think you will like it",
    score: "7.7",
    count: "107",
  },
  {
    label: "Friend Score",
    description: "What your friends think",
    score: "7.5",
    count: "1",
  },
] as const;

export const popularDishes = [
  { title: "Menu", subtitle: "1 photo", color: "#B9B6AF" },
  { title: "Fish and chips", subtitle: "2 recommended", color: "#7B8FA2" },
  { title: "All photos", subtitle: "Gallery", color: "#8A7B70" },
  { title: "Crispy prawns", subtitle: "4 recommended", color: "#7B6A62" },
  { title: "Sea salt potatoes", subtitle: "3 photos", color: "#9A8A73" },
  { title: "Lobster roll", subtitle: "6 saves", color: "#677C8A" },
] as const;

export const restaurantUpdates = [
  {
    title: "What friends are saying",
    body: "Steph says the fish and chips is worth the trip, and Dylan recommends going before 7 PM.",
  },
  {
    title: "Best moment to visit",
    body: "Weeknights after 6 PM have the shortest wait and the strongest service ratings.",
  },
  {
    title: "Good for",
    body: "Casual dinners, low-key dates, and group hangs when you want seafood without formality.",
  },
  {
    title: "Ordering tip",
    body: "Share the prawns, then split one fried item and one grilled item if it is your first visit.",
  },
] as const;

export const listFilters = [
  "City",
  "Reserve",
  "Open now",
  "Cuisine",
  "Price",
] as const;

export const listItems = [
  {
    name: "1. Sushi no Midori Ginza",
    cuisine: "JPY | Japanese, Sushi",
    location: "Tokyo, Japan",
    meta: "6858 mi | Closed | Opens 11:00 AM",
    score: "10.0",
  },
  {
    name: "2. Mukjeon",
    cuisine: "KRW | Korean",
    location: "Seoul, South Korea",
    meta: "7114 mi | Closed | Opens 9:00 AM",
    score: "10.0",
  },
  {
    name: "3. Pelican Cafe",
    cuisine: "JPY | Brunch",
    location: "Taito City, Japan",
    meta: "6855 mi | Closed | Opens 9:00 AM",
    score: "10.0",
  },
  {
    name: "4. Eem - Thai BBQ and Cocktails",
    cuisine: "$$ | Barbecue, Thai",
    location: "Boise, Portland, OR",
    meta: "2172 mi | Open | Closes 3:00 PM",
    score: "10.0",
  },
  {
    name: "5. Hanuman Thai Eatery on Newport",
    cuisine: "$$ | Thai",
    location: "Newport Beach, CA",
    meta: "1045 mi | Open | Closes 9:00 PM",
    score: "10.0",
  },
  {
    name: "6. Cafe Lune",
    cuisine: "$$ | Bakery, Brunch",
    location: "Capitol Hill, Seattle, WA",
    meta: "5 mi | Open | Closes 2:00 PM",
    score: "9.8",
  },
  {
    name: "7. Toki Alley",
    cuisine: "$$ | Izakaya",
    location: "Brooklyn, NY",
    meta: "822 mi | Open | Closes 11:00 PM",
    score: "9.7",
  },
  {
    name: "8. Oyster Social",
    cuisine: "$$$ | Seafood, Wine Bar",
    location: "Atlanta, GA",
    meta: "220 mi | Open | Closes 10:00 PM",
    score: "9.6",
  },
  {
    name: "9. Miga Noodle Lab",
    cuisine: "$$ | Korean, Noodles",
    location: "Los Angeles, CA",
    meta: "1937 mi | Open | Closes 9:30 PM",
    score: "9.6",
  },
  {
    name: "10. Bar Roma",
    cuisine: "$$$ | Italian",
    location: "Chicago, IL",
    meta: "716 mi | Open | Closes 10:00 PM",
    score: "9.5",
  },
  {
    name: "11. Sora Cafe",
    cuisine: "$ | Coffee, Pastry",
    location: "Bellevue, WA",
    meta: "9 mi | Open | Closes 5:00 PM",
    score: "9.3",
  },
  {
    name: "12. Midnight Broth",
    cuisine: "$$ | Ramen",
    location: "Portland, OR",
    meta: "172 mi | Open | Closes 12:00 AM",
    score: "9.2",
  },
] as const;

export const searchFilters = [
  { label: "Reserve now", icon: "calendar" },
  { label: "Recs", icon: "heart" },
  { label: "Trending", icon: "trending-up" },
  { label: "Friends", icon: "users" },
] as const;

export const recentSearches = [
  { name: "Boiling Point", location: "Southcenter, Tukwila, WA" },
  { name: "LeTAO", location: "West Bellevue, Bellevue, WA" },
  { name: "So Tasty", location: "Crossroads, Bellevue, WA" },
  { name: "Sushi Cafe", location: "Renton, WA" },
  { name: "Supreme Dumplings", location: "Crossroads, Bellevue, WA" },
  { name: "Cafe Lune", location: "Capitol Hill, Seattle, WA" },
  { name: "Mochi House", location: "Fremont, Seattle, WA" },
  { name: "Oyster Social", location: "Midtown, Atlanta, GA" },
  { name: "Toki Alley", location: "Williamsburg, Brooklyn, NY" },
  { name: "Bar Roma", location: "West Loop, Chicago, IL" },
  { name: "Miga Noodle Lab", location: "Koreatown, Los Angeles, CA" },
  { name: "Moonlight Bakery", location: "Irvine, CA" },
] as const;

export const leaderboardFilters = ["Emory University", "All Cities"] as const;

export const leaderboardEntries = [
  { rank: "1", initials: "ID", handle: "@irisduan", score: "1415", color: "#D4C4B0" },
  { rank: "2", initials: "DY", handle: "@dyangster", score: "1195", color: "#B0C4D4" },
  { rank: "3", initials: "PS", handle: "@pearlstone", score: "920", color: "#C4D4B0" },
  { rank: "4", initials: "ER", handle: "@ethanrattanakhom", score: "897", color: "#D4B0C4" },
  { rank: "5", initials: "MA", handle: "@maddieabramson", score: "895", color: "#C4B0D4" },
  { rank: "6", initials: "SM", handle: "@stellamarshall", score: "854", color: "#B0D4C4" },
  { rank: "7", initials: "DT", handle: "@dantran98", score: "812", color: "#D4D4B0" },
  { rank: "8", initials: "SB", handle: "@shaunbaek", score: "790", color: "#CFCFCF" },
  { rank: "9", initials: "AL", handle: "@alyssa.listed", score: "742", color: "#D8C2B2" },
  { rank: "10", initials: "JC", handle: "@jcooksdaily", score: "701", color: "#C2D8D4" },
  { rank: "11", initials: "KW", handle: "@kwanders", score: "684", color: "#D5D0A8" },
  { rank: "12", initials: "BN", handle: "@bitesbynina", score: "650", color: "#D5B4C8" },
  { rank: "13", initials: "RT", handle: "@ramenroute", score: "624", color: "#C2CDE0" },
  { rank: "14", initials: "LG", handle: "@lategrapes", score: "603", color: "#C9D8B2" },
  { rank: "15", initials: "OM", handle: "@omnommax", score: "587", color: "#DCC7A8" },
] as const;

export const profileRows = [
  { label: "Been", value: "537", icon: "check-circle", accent: true },
  { label: "Want to Try", value: "210", icon: "bookmark", accent: false },
  { label: "Recs for You", value: "", icon: "heart", accent: true },
] as const;

export const profileCards = [
  { label: "Rank on Beli", value: "#16347", icon: "award" },
  { label: "Current Streak", value: "1 week", icon: "droplet" },
  { label: "Saved Guides", value: "28", icon: "book-open" },
  { label: "Photo Drafts", value: "14", icon: "image" },
] as const;

export const profileHighlights = [
  {
    title: "Recent activity",
    body: "You ranked 6 places this week and saved 3 guides from friends in Seattle and Atlanta.",
  },
  {
    title: "Top cuisine",
    body: "Thai is still your strongest category this year, with 24 rankings and a 9.1 average score.",
  },
  {
    title: "Travel streak",
    body: "You have logged restaurants in 5 cities over the last 30 days, including Tokyo and Portland.",
  },
  {
    title: "Next unlock",
    body: "Rank 9 more places to unlock another annual recap card for your 2026 progress.",
  },
] as const;

export const goalOptions = ["160", "200", "250", "Customize"] as const;
