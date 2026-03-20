import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

import {
  featuredLists,
  feedPosts,
  goalOptions,
  inviteFeatures,
  leaderboardEntries,
  leaderboardFilters,
  listFilters,
  listItems,
  popularDishes,
  profileCards,
  profileHighlights,
  profileRows,
  quickFilters,
  recentSearches,
  restaurantActions,
  restaurantScores,
  restaurantUpdates,
  searchFilters,
} from "./src/data";
import { getTheme, type Theme, type ThemeName } from "./src/theme";
import {
  Avatar,
  BeliWordmark,
  BottomNav,
  Card,
  IconButton,
  OutlineButton,
  Pill,
  PillsRow,
  PlaceholderBlock,
  PrimaryButton,
  ScoreBadge,
  SearchBar,
  SectionHeader,
  StatusStrip,
  ThemeToggleButton,
  type NavRoute,
} from "./src/components/ui";

type RouteKey = NavRoute | "restaurant";
type ListTab = "Been" | "Want to Try" | "Recs" | "Guides" | "More";
type SearchTab = "Restaurants" | "Members";
type BoardMetric = "Been" | "Influence" | "Notes" | "Photos";

type ScreenProps = {
  isDark: boolean;
  onNavigate: (route: RouteKey) => void;
  onToggleTheme: () => void;
  theme: Theme;
};

const BOTTOM_PADDING = 132;
const listTabs: readonly ListTab[] = ["Been", "Want to Try", "Recs", "Guides", "More"];
const boardMetrics: readonly BoardMetric[] = ["Been", "Influence", "Notes", "Photos"];
const memberResults = [
  { initials: "SB", name: "shaun baek", handle: "@shaunbaek", subtitle: "foodie worldwide" },
  { initials: "ST", name: "Steph", handle: "@stephtriesit", subtitle: "Great service hunter" },
  { initials: "DY", name: "Dylan Yang", handle: "@dyangster", subtitle: "Tokyo and Seattle lists" },
  { initials: "MA", name: "Maddie Abramson", handle: "@maddieabramson", subtitle: "Brunch and bakery recs" },
] as const;

export default function App() {
  const systemScheme = useColorScheme();
  const initialTheme: ThemeName = systemScheme === "dark" ? "dark" : "light";
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);
  const [route, setRoute] = useState<RouteKey>("home");
  const { width } = useWindowDimensions();
  const theme = getTheme(themeName);
  const isWide = width >= 560;

  const sharedProps: ScreenProps = {
    isDark: themeName === "dark",
    onNavigate: setRoute,
    onToggleTheme: () => setThemeName((current) => (current === "dark" ? "light" : "dark")),
    theme,
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
      <View style={styles.centered}>
        <View
          style={[
            styles.device,
            isWide ? styles.deviceFloating : null,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.shadowBase,
            },
          ]}
        >
          <View style={styles.screen}>{renderRoute(route, sharedProps)}</View>
          <BottomNav
            active={route === "restaurant" ? undefined : route}
            onNavigate={setRoute}
            theme={theme}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function renderRoute(route: RouteKey, props: ScreenProps) {
  switch (route) {
    case "home":
      return <HomeScreen {...props} />;
    case "restaurant":
      return <RestaurantScreen {...props} />;
    case "lists":
      return <ListsScreen {...props} />;
    case "search":
      return <SearchScreen {...props} />;
    case "leaderboard":
      return <LeaderboardScreen {...props} />;
    case "profile":
      return <ProfileScreen {...props} />;
    default:
      return <HomeScreen {...props} />;
  }
}

function HomeScreen({ theme, onNavigate, onToggleTheme, isDark }: ScreenProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Reserve now"]);
  const [inviteSent, setInviteSent] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const visibleLists =
    selectedFilters.includes("Trending") || selectedFilters.includes("Recs Nearby")
      ? featuredLists
      : featuredLists.slice(0, 2);

  return (
    <ScrollView
      contentContainerStyle={[styles.screenScroll, { paddingBottom: BOTTOM_PADDING }]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusStrip theme={theme} />
      <View style={styles.topBar}>
        <BeliWordmark theme={theme} />
        <View style={styles.topBarActions}>
          <IconButton filled icon="calendar" onPress={() => onNavigate("lists")} theme={theme} />
          <IconButton badge="2" filled icon="bell" onPress={() => setLiked((value) => !value)} theme={theme} />
          <ThemeToggleButton isDark={isDark} onPress={onToggleTheme} theme={theme} />
        </View>
      </View>

      <SearchBar
        onPress={() => onNavigate("search")}
        placeholder="Search a restaurant, member, etc."
        theme={theme}
      />
      <PillsRow
        items={quickFilters}
        onPressLabel={(label) => setSelectedFilters((current) => toggleLabel(current, label))}
        selectedLabels={selectedFilters}
        theme={theme}
      />

      <Card style={styles.homeCard} theme={theme}>
        <Text style={[styles.inviteTitle, { color: theme.colors.tealTint }]}>
          {inviteSent ? "Invites queued for your crew" : "You have 20 invites left!"}
        </Text>
        <Text style={[styles.inviteSubtitle, { color: theme.colors.textMuted }]}>
          {inviteSent ? "We mocked a send flow for this demo." : "Unlock features as friends join (0/6)"}
        </Text>

        <ScrollView
          contentContainerStyle={styles.featureScroller}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {inviteFeatures.map((feature) => (
            <Pressable
              key={feature.label}
              onPress={() => setSelectedFilters([feature.label])}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View style={styles.featureItem}>
                <View
                  style={[
                    styles.featureIconWrap,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor:
                        selectedFilters[0] === feature.label
                          ? theme.colors.tealTint
                          : theme.colors.border,
                    },
                  ]}
                >
                  <Feather color={theme.colors.textMuted} name={feature.icon} size={20} />
                </View>
                <Text style={[styles.featureLabel, { color: theme.colors.textMuted }]}>
                  {feature.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <PrimaryButton
          label={inviteSent ? "Invite sent" : "Invite friends"}
          onPress={() => setInviteSent((current) => !current)}
          theme={theme}
        />
      </Card>

      <Pressable onPress={() => onNavigate("lists")} style={({ pressed }) => [{ opacity: pressed ? 0.84 : 1 }]}>
        <View style={[styles.banner, { backgroundColor: theme.colors.banner }]}>
          <Text style={[styles.bannerEyebrow, { color: theme.colors.text }]}>YOUR MARCH</Text>
          <Text style={[styles.bannerTitle, { color: theme.colors.tealTint }]}>EATS</Text>
          <Text style={[styles.bannerBody, { color: theme.colors.text }]}>
            Rank 3 more spots to unlock!
          </Text>
        </View>
      </Pressable>

      <SectionHeader action="See all" theme={theme} title="Featured Lists" />
      <ScrollView
        contentContainerStyle={styles.horizontalCards}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {visibleLists.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => onNavigate("lists")}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={[styles.featuredCard, { backgroundColor: item.color }]}>
              <View style={[styles.featuredOverlay, { backgroundColor: theme.colors.overlay }]} />
              <View style={styles.featuredCopy}>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader theme={theme} title="Your Feed" />
      <Pressable onPress={() => onNavigate("search")} style={styles.feedComposer}>
        <Avatar label="SB" theme={theme} />
        <View
          style={[
            styles.feedComposerInput,
            { backgroundColor: theme.colors.searchBackground },
          ]}
        >
          <Text style={[styles.feedComposerText, { color: theme.colors.textMuted }]}>
            What recs are you looking for?
          </Text>
        </View>
      </Pressable>

      {feedPosts.map((post, index) => (
        <Pressable
          key={`${post.user}-${post.restaurant}`}
          onPress={() => onNavigate("restaurant")}
          style={({ pressed }) => [{ opacity: pressed ? 0.86 : 1 }]}
        >
          <View style={[styles.feedPost, { borderColor: theme.colors.border }]}>
            <View style={styles.feedHeader}>
              <Avatar background={post.avatarColor} label={post.initials} theme={theme} />
              <View style={styles.feedMeta}>
                <Text style={[styles.feedHeadline, { color: theme.colors.text }]}>
                  <Text style={styles.feedStrong}>{post.user}</Text> ranked{" "}
                  <Text style={styles.feedStrong}>{post.restaurant}</Text>
                </Text>
                <Text style={[styles.feedSupport, { color: theme.colors.textMuted }]}>
                  {post.location}
                </Text>
                <Text style={[styles.feedSupport, { color: theme.colors.textMuted }]}>
                  {post.visitText}
                </Text>
              </View>
              <ScoreBadge filled={false} theme={theme} value={post.score} />
            </View>

            <PlaceholderBlock
              color={theme.colors.elevated}
              height={index % 2 === 0 ? 156 : 144}
              label="Food Photo"
              theme={theme}
            />

            <Text style={[styles.feedNotes, { color: theme.colors.text }]}>
              <Text style={styles.feedStrong}>Notes:</Text> {post.notes}
            </Text>

            <View style={styles.feedActions}>
              <View style={styles.feedActionGroup}>
                <IconAction
                  active={liked && index === 0}
                  icon="heart"
                  onPress={() => setLiked((current) => !current)}
                  theme={theme}
                />
                <IconAction icon="message-circle" onPress={() => onNavigate("search")} theme={theme} />
                <IconAction icon="send" onPress={() => setInviteSent(true)} theme={theme} />
              </View>
              <View style={styles.feedActionGroup}>
                <IconAction icon="plus-circle" onPress={() => onNavigate("lists")} theme={theme} />
                <IconAction
                  active={saved && index === 0}
                  icon="bookmark"
                  onPress={() => setSaved((current) => !current)}
                  theme={theme}
                />
              </View>
            </View>

            <Text style={[styles.feedTimestamp, { color: theme.colors.textMuted }]}>
              {post.timestamp}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function RestaurantScreen({ theme, onNavigate, onToggleTheme, isDark }: ScreenProps) {
  const [saved, setSaved] = useState(false);
  const [queued, setQueued] = useState(false);
  const [selectedAction, setSelectedAction] = useState("Directions");
  const [mapMode, setMapMode] = useState<"Map View" | "Street View">("Map View");

  return (
    <ScrollView
      contentContainerStyle={[styles.screenScroll, { paddingBottom: BOTTOM_PADDING }]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.mapBlock, { backgroundColor: theme.colors.elevated }]}>
        <View style={styles.mapHeader}>
          <IconButton filled icon="chevron-left" onPress={() => onNavigate("home")} theme={theme} />
          <View style={styles.mapHeaderActions}>
            <IconButton filled icon="share-2" onPress={() => setQueued(true)} theme={theme} />
            <ThemeToggleButton isDark={isDark} onPress={onToggleTheme} theme={theme} />
          </View>
        </View>
        <Pressable onPress={() => setMapMode((current) => (current === "Map View" ? "Street View" : "Map View"))}>
          <Text style={[styles.mapLabel, { color: theme.colors.textMuted }]}>{mapMode}</Text>
        </Pressable>
        <Text style={[styles.restaurantTitle, { color: theme.colors.text }]}>Salty Blue</Text>
      </View>

      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantScoreRow}>
          <ScoreBadge filled theme={theme} value="7.7" />
          <Text style={[styles.restaurantScoreText, { color: theme.colors.textMuted }]}>
            (107 ratings)
          </Text>
          <View style={styles.restaurantInfoActions}>
            <IconAction active={queued} icon="plus-circle" onPress={() => setQueued((current) => !current)} theme={theme} />
            <IconAction active={saved} icon="bookmark" onPress={() => setSaved((current) => !current)} theme={theme} />
          </View>
        </View>
        <Text style={[styles.restaurantTags, { color: theme.colors.tealTint }]}>
          Lunch | Casual Dinner | Great Service | Quick Bite | Cheap Eat
        </Text>
        <Text style={[styles.restaurantMeta, { color: theme.colors.text }]}>
          $$ | Seafood, Australian
        </Text>
        <Text style={[styles.restaurantSubMeta, { color: theme.colors.textMuted }]}>
          Downtown Renton, Renton, WA
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.actionScroller}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {restaurantActions.map((action) => (
          <OutlineButton
            icon={action.icon}
            key={action.label}
            label={action.label}
            onPress={() => setSelectedAction(action.label)}
            selected={selectedAction === action.label}
            theme={theme}
          />
        ))}
      </ScrollView>

      <Card style={styles.infoCallout} theme={theme}>
        <Text style={[styles.infoCalloutTitle, { color: theme.colors.text }]}>
          {selectedAction === "Directions" ? "Fastest route saved" : `${selectedAction} ready`}
        </Text>
        <Text style={[styles.infoCalloutBody, { color: theme.colors.textMuted }]}>
          This demo keeps the restaurant detail interactive while preserving the dark mode styling.
        </Text>
      </Card>

      <View style={styles.sectionBlock}>
        <SectionHeader action="See all scores" theme={theme} title="Scores" />
        <View style={styles.scoreCardRow}>
          {restaurantScores.map((item) => (
            <Card key={item.label} style={styles.scoreCard} theme={theme}>
              <View style={styles.scoreCardBadge}>
                <ScoreBadge filled={false} size={50} theme={theme} value={item.score} />
                <View style={[styles.scoreCount, { backgroundColor: theme.colors.teal }]}>
                  <Text style={styles.scoreCountText}>{item.count}</Text>
                </View>
              </View>
              <View style={styles.scoreCardCopy}>
                <Text style={[styles.scoreCardLabel, { color: theme.colors.text }]}>{item.label}</Text>
                <Text style={[styles.scoreCardDescription, { color: theme.colors.textMuted }]}>
                  {item.description}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader action="See all photos" theme={theme} title="Popular Dishes" />
        <ScrollView
          contentContainerStyle={styles.horizontalCards}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {popularDishes.map((item) => (
            <Pressable
              key={item.title}
              onPress={() => setSelectedAction(item.title)}
              style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }]}
            >
              <View style={styles.dishCard}>
                <PlaceholderBlock color={item.color} height={112} label="Dish Photo" theme={theme} />
                <Text style={[styles.dishTitle, { color: theme.colors.text }]}>{item.title}</Text>
                <Text style={[styles.dishSubtitle, { color: theme.colors.textMuted }]}>{item.subtitle}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {restaurantUpdates.map((update) => (
        <Card key={update.title} style={styles.friendCard} theme={theme}>
          <Text style={[styles.friendCardTitle, { color: theme.colors.text }]}>{update.title}</Text>
          <Text style={[styles.friendCardBody, { color: theme.colors.textMuted }]}>{update.body}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

function ListsScreen({ theme, onNavigate, onToggleTheme, isDark }: ScreenProps) {
  const [activeTab, setActiveTab] = useState<ListTab>("Been");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["City"]);
  const [showMap, setShowMap] = useState(false);

  const visibleItems = listItems.filter((item, index) => {
    if (activeTab === "Been") {
      return true;
    }

    if (activeTab === "Want to Try") {
      return index < 3;
    }

    if (activeTab === "Recs") {
      return index >= 2;
    }

    if (activeTab === "Guides") {
      return index < 2;
    }

    return index !== 1;
  });

  return (
    <View style={styles.flex}>
      <ScrollView
        contentContainerStyle={[styles.screenScroll, { paddingBottom: BOTTOM_PADDING }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusStrip theme={theme} />
        <View style={styles.centerHeader}>
          <Text style={[styles.centerHeaderLabel, { color: theme.colors.text }]}>MY LISTS</Text>
          <View style={styles.centerHeaderActions}>
            <IconButton filled icon="share-2" onPress={() => setShowMap(false)} theme={theme} />
            <ThemeToggleButton isDark={isDark} onPress={onToggleTheme} theme={theme} />
          </View>
        </View>

        <View style={styles.listTitleRow}>
          <Text style={[styles.listTitle, { color: theme.colors.text }]}>Restaurants</Text>
          <Feather color={theme.colors.text} name="chevron-down" size={20} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.tabScroll, { borderColor: theme.colors.border }]}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {listTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={styles.tabItem}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isActive ? theme.colors.text : theme.colors.textMuted },
                  ]}
                >
                  {tab}
                </Text>
                {isActive ? <View style={[styles.tabIndicator, { backgroundColor: theme.colors.text }]} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView
          contentContainerStyle={styles.filterScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            onPress={() => setSelectedFilters([])}
            style={[
              styles.iconChip,
              {
                backgroundColor: selectedFilters.length === 0 ? theme.colors.card : "transparent",
                borderColor: theme.colors.inputBorder,
              },
            ]}
          >
            <Feather color={theme.colors.text} name="sliders" size={14} />
          </Pressable>
          {listFilters.map((filter) => {
            const isActive = selectedFilters.includes(filter);

            return (
              <Pressable
                key={filter}
                onPress={() => setSelectedFilters((current) => toggleLabel(current, filter))}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isActive ? theme.colors.card : "transparent",
                    borderColor: isActive ? theme.colors.tealTint : theme.colors.inputBorder,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: isActive ? theme.colors.text : theme.colors.textMuted },
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.sortRow}>
          <View style={styles.sortLabel}>
            <Feather color={theme.colors.tealTint} name="sliders" size={14} />
            <Text style={[styles.sortText, { color: theme.colors.tealTint }]}>Score</Text>
          </View>
          <Pressable onPress={() => onNavigate("search")}>
            <Feather color={theme.colors.textMuted} name="search" size={18} />
          </Pressable>
        </View>

        {showMap ? (
          <View style={[styles.inlineMap, { backgroundColor: theme.colors.cardAlt, borderColor: theme.colors.border }]}>
            <Text style={[styles.inlineMapTitle, { color: theme.colors.text }]}>Map preview enabled</Text>
            <Text style={[styles.inlineMapBody, { color: theme.colors.textMuted }]}>
              Keep this as a lightweight toggle until we wire a real map screen.
            </Text>
          </View>
        ) : null}

        {visibleItems.map((item, index) => (
          <Pressable
            key={`${activeTab}-${item.name}`}
            onPress={() => onNavigate(index === 0 ? "restaurant" : "home")}
            style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }]}
          >
            <View style={[styles.listRow, { borderColor: theme.colors.border }]}>
              <View style={styles.listMeta}>
                <Text style={[styles.listName, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[styles.listSupport, { color: theme.colors.textMuted }]}>{item.cuisine}</Text>
                <Text style={[styles.listSupport, { color: theme.colors.textMuted }]}>{item.location}</Text>
                <Text style={[styles.listTiny, { color: theme.colors.textMuted }]}>{item.meta}</Text>
              </View>
              <ScoreBadge filled={false} theme={theme} value={item.score} />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() => setShowMap((current) => !current)}
        style={[styles.floatingMapButton, { backgroundColor: theme.colors.teal }]}
      >
        <Feather color={theme.colors.white} name="map" size={16} />
        <Text style={styles.floatingMapLabel}>{showMap ? "Hide Map" : "View Map"}</Text>
      </Pressable>
    </View>
  );
}

function SearchScreen({ theme, onNavigate, onToggleTheme, isDark }: ScreenProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>("Restaurants");
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Reserve now", "Trending"]);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [recentItems, setRecentItems] = useState(() => Array.from(recentSearches));
  const [synced, setSynced] = useState(false);

  const lowered = query.trim().toLowerCase();
  const filteredRecents = recentItems.filter((item) => {
    if (!lowered) {
      return true;
    }

    return `${item.name} ${item.location}`.toLowerCase().includes(lowered);
  });

  const filteredMembers = memberResults.filter((item) => {
    if (!lowered) {
      return true;
    }

    return `${item.name} ${item.handle} ${item.subtitle}`.toLowerCase().includes(lowered);
  });

  return (
    <ScrollView
      contentContainerStyle={[styles.screenScroll, { paddingBottom: BOTTOM_PADDING }]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusStrip theme={theme} />
      <View style={styles.topBar}>
        <BeliWordmark theme={theme} />
        <View style={styles.topBarActions}>
          <IconButton
            filled
            icon={query ? "x-circle" : "x"}
            onPress={() => (query ? setQuery("") : onNavigate("home"))}
            theme={theme}
          />
          <ThemeToggleButton isDark={isDark} onPress={onToggleTheme} theme={theme} />
        </View>
      </View>

      <View style={[styles.segmentTabs, { borderColor: theme.colors.border }]}>
        {(["Restaurants", "Members"] as const).map((tab) => {
          const isActive = activeTab === tab;

          return (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.segmentTabItem}>
              <Text
                style={[
                  isActive ? styles.segmentTabActive : styles.segmentTabInactive,
                  { color: isActive ? theme.colors.tealTint : theme.colors.textMuted },
                ]}
              >
                {tab}
              </Text>
              {isActive ? <View style={[styles.segmentAccent, { backgroundColor: theme.colors.tealTint }]} /> : null}
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.searchInput, { borderColor: theme.colors.inputBorder }]}>
        <Feather color={theme.colors.textMuted} name="search" size={17} />
        <TextInput
          onChangeText={setQuery}
          placeholder={activeTab === "Restaurants" ? "Search restaurant, cuisine, occasion" : "Search member or handle"}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.searchInputField, { color: theme.colors.text }]}
          value={query}
        />
      </View>

      <View style={[styles.locationRow, { borderColor: theme.colors.inputBorder }]}>
        <Feather color={theme.colors.textMuted} name="map-pin" size={16} />
        <Text style={[styles.locationText, { color: theme.colors.text }]}>
          {locationEnabled ? "Current Location" : "Location removed"}
        </Text>
        <Pressable onPress={() => setLocationEnabled((current) => !current)}>
          <Feather color={theme.colors.textMuted} name="x" size={15} />
        </Pressable>
      </View>

      <PillsRow
        items={searchFilters}
        onPressLabel={(label) => setSelectedFilters((current) => toggleLabel(current, label))}
        selectedLabels={selectedFilters}
        theme={theme}
      />

      {activeTab === "Restaurants" ? (
        <>
          <Text style={[styles.searchSectionTitle, { color: theme.colors.text }]}>Recents</Text>
          {filteredRecents.map((item, index) => (
            <View key={item.name} style={[styles.recentRow, { borderColor: theme.colors.border }]}>
              <Pressable
                onPress={() => onNavigate(index === 0 ? "restaurant" : "home")}
                style={styles.recentPress}
              >
                <Feather color={theme.colors.textMuted} name="clock" size={18} />
                <View style={styles.recentMeta}>
                  <Text style={[styles.recentName, { color: theme.colors.text }]}>{item.name}</Text>
                  <Text style={[styles.recentLocation, { color: theme.colors.textMuted }]}>{item.location}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setRecentItems((current) => current.filter((entry) => entry.name !== item.name))}
              >
                <Feather color={theme.colors.textMuted} name="x" size={18} />
              </Pressable>
            </View>
          ))}

          <Text style={[styles.searchSectionTitle, { color: theme.colors.text }]}>
            Places you may have been in Decatur, GA
          </Text>

          <Pressable onPress={() => setSynced((current) => !current)} style={({ pressed }) => [{ opacity: pressed ? 0.84 : 1 }]}>
            <Card style={styles.syncCard} theme={theme}>
              <View style={[styles.syncIcon, { backgroundColor: theme.colors.background }]}>
                <Feather color={theme.colors.tealTint} name="calendar" size={20} />
              </View>
              <View style={styles.syncCopy}>
                <Text style={[styles.syncTitle, { color: theme.colors.text }]}>
                  {synced ? "Reservations synced" : "Keep your list up-to-date!"}
                </Text>
                <Text style={[styles.syncLink, { color: theme.colors.tealTint }]}>
                  {synced ? "Mock Gmail sync completed" : "Sync your past reservations from Gmail"}
                </Text>
              </View>
            </Card>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={[styles.searchSectionTitle, { color: theme.colors.text }]}>Members</Text>
          {filteredMembers.map((member) => (
            <Pressable
              key={member.handle}
              onPress={() => onNavigate("profile")}
              style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }]}
            >
              <View style={[styles.memberRow, { borderColor: theme.colors.border }]}>
                <Avatar label={member.initials} theme={theme} />
                <View style={styles.memberMeta}>
                  <Text style={[styles.memberName, { color: theme.colors.text }]}>{member.name}</Text>
                  <Text style={[styles.memberHandle, { color: theme.colors.textMuted }]}>{member.handle}</Text>
                  <Text style={[styles.memberHandle, { color: theme.colors.textMuted }]}>{member.subtitle}</Text>
                </View>
                <Feather color={theme.colors.textMuted} name="chevron-right" size={18} />
              </View>
            </Pressable>
          ))}
        </>
      )}
    </ScrollView>
  );
}

function LeaderboardScreen({ theme, onToggleTheme, isDark }: ScreenProps) {
  const [metric, setMetric] = useState<BoardMetric>("Been");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Emory University"]);
  const [invitesQueued, setInvitesQueued] = useState(false);

  const entries = leaderboardEntries.map((entry, index) => ({
    ...entry,
    displayScore:
      metric === "Been"
        ? entry.score
        : metric === "Influence"
          ? String(540 - index * 33)
          : metric === "Notes"
            ? String(180 - index * 9)
            : String(95 - index * 4),
  }));

  return (
    <ScrollView
      contentContainerStyle={[styles.screenScroll, { paddingBottom: BOTTOM_PADDING }]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusStrip theme={theme} />
      <View style={styles.leaderboardHeader}>
        <Text style={[styles.leaderboardTitle, { color: theme.colors.text }]}>Leaderboard</Text>
        <View style={styles.leaderboardHeaderActions}>
          <Pressable
            onPress={() => setInvitesQueued((current) => !current)}
            style={[styles.inviteButton, { backgroundColor: theme.colors.teal }]}
          >
            <Feather color={theme.colors.white} name="user-plus" size={14} />
            <Text style={styles.inviteButtonText}>{invitesQueued ? "Queued" : "Invite"}</Text>
          </Pressable>
          <ThemeToggleButton isDark={isDark} onPress={onToggleTheme} theme={theme} />
        </View>
      </View>

      <View style={[styles.segmentControl, { borderColor: theme.colors.inputBorder }]}>
        {boardMetrics.map((item, index) => {
          const isActive = metric === item;

          return (
            <Pressable
              key={item}
              onPress={() => setMetric(item)}
              style={[
                styles.segmentControlItem,
                index < boardMetrics.length - 1
                  ? { borderRightColor: theme.colors.inputBorder, borderRightWidth: 1 }
                  : null,
                isActive ? { backgroundColor: theme.colors.card } : null,
              ]}
            >
              <Text
                style={[
                  styles.segmentControlLabel,
                  { color: isActive ? theme.colors.text : theme.colors.textMuted },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.leaderboardBodyText, { color: theme.colors.textMuted }]}>
        {metric === "Been"
          ? "Number of places on your been list"
          : metric === "Influence"
            ? "How many people save places after your activity"
            : metric === "Notes"
              ? "Total note contributions this year"
              : "Photo contributions shared with friends"}
      </Text>

      <ScrollView
        contentContainerStyle={styles.filterScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {leaderboardFilters.map((filter) => {
          const isActive = selectedFilters.includes(filter);

          return (
            <Pill
              filled={false}
              key={filter}
              label={filter}
              onPress={() => setSelectedFilters((current) => toggleLabel(current, filter))}
              selected={isActive}
              theme={theme}
            />
          );
        })}
      </ScrollView>

      <Card style={styles.schoolCard} theme={theme}>
        <Feather color={theme.colors.tealTint} name="award" size={28} />
        <View style={styles.schoolCopy}>
          <Text style={[styles.schoolTitle, { color: theme.colors.tealTint }]}>
            Your school's ranking
          </Text>
          <Text style={[styles.schoolDescription, { color: theme.colors.textMuted }]}>
            See the overall university leaderboard
          </Text>
        </View>
        <Feather color={theme.colors.textMuted} name="chevron-right" size={18} />
      </Card>

      {entries.map((entry) => (
        <Pressable key={`${metric}-${entry.handle}`} style={({ pressed }) => [{ opacity: pressed ? 0.84 : 1 }]}>
          <View style={styles.leaderboardRow}>
            <Text style={[styles.rankLabel, { color: theme.colors.textMuted }]}>{entry.rank}</Text>
            <Avatar background={entry.color} label={entry.initials} theme={theme} />
            <Text style={[styles.handleLabel, { color: theme.colors.textMuted }]}>{entry.handle}</Text>
            <Text style={[styles.handleScore, { color: theme.colors.text }]}>{entry.displayScore}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function ProfileScreen({ theme, onNavigate, onToggleTheme, isDark }: ScreenProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>(goalOptions[1]);
  const [editing, setEditing] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={[styles.screenScroll, { paddingBottom: BOTTOM_PADDING }]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusStrip theme={theme} />
      <View style={styles.topBar}>
        <Text style={[styles.profileName, { color: theme.colors.text }]}>shaun baek</Text>
        <View style={styles.topBarActions}>
          <IconButton filled icon="share-2" onPress={() => setEditing(false)} theme={theme} />
          <ThemeToggleButton isDark={isDark} onPress={onToggleTheme} theme={theme} />
        </View>
      </View>

      <View style={styles.profileAvatarWrap}>
        <View
          style={[
            styles.profileAvatar,
            { backgroundColor: theme.colors.elevated, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.profileAvatarText, { color: theme.colors.textMuted }]}>SB</Text>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={[styles.profileHandle, { color: theme.colors.text }]}>@shaunbaek</Text>
        <Text style={[styles.profileMeta, { color: theme.colors.textMuted }]}>
          Member since October 2023
        </Text>
        <Text style={[styles.profileBio, { color: theme.colors.text }]}>foodie worldwide</Text>
        <View style={styles.profileSchool}>
          <Feather color={theme.colors.text} name="award" size={14} />
          <Text style={[styles.profileSchoolText, { color: theme.colors.text }]}>
            Emory University '26
          </Text>
        </View>
      </View>

      <View style={styles.profileStats}>
        {[
          { label: "Followers", value: "66" },
          { label: "Following", value: "60" },
          { label: "Rank on Beli", value: "#16347" },
        ].map((item) => (
          <View key={item.label} style={styles.profileStat}>
            <Text style={[styles.profileStatValue, { color: theme.colors.text }]}>{item.value}</Text>
            <Text style={[styles.profileStatLabel, { color: theme.colors.textMuted }]}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.profileActions}>
        <Pressable
          onPress={() => setEditing((current) => !current)}
          style={[styles.profileButton, { borderColor: theme.colors.inputBorder }]}
        >
          <Text style={[styles.profileButtonText, { color: theme.colors.text }]}>
            {editing ? "Save changes" : "Edit profile"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onNavigate("search")}
          style={[styles.profileButton, { borderColor: theme.colors.inputBorder }]}
        >
          <Text style={[styles.profileButtonText, { color: theme.colors.text }]}>Share profile</Text>
        </Pressable>
        <Pressable
          onPress={() => onNavigate("lists")}
          style={[
            styles.profileButton,
            styles.profileButtonSmall,
            { borderColor: theme.colors.inputBorder },
          ]}
        >
          <Feather color={theme.colors.text} name="chevron-down" size={14} />
        </Pressable>
      </View>

      <View style={[styles.profileRows, { borderTopColor: theme.colors.border }]}>
        {profileRows.map((row) => (
          <Pressable
            key={row.label}
            onPress={() => onNavigate(row.label === "Recs for You" ? "search" : "lists")}
          >
            <View style={[styles.profileRow, { borderBottomColor: theme.colors.border }]}>
              <Feather
                color={row.accent ? theme.colors.tealTint : theme.colors.text}
                name={row.icon}
                size={22}
              />
              <Text style={[styles.profileRowLabel, { color: theme.colors.text }]}>{row.label}</Text>
              <Text style={[styles.profileRowValue, { color: theme.colors.text }]}>{row.value}</Text>
              <Feather color={theme.colors.textMuted} name="chevron-right" size={16} />
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.profileCardRow}>
        {profileCards.map((card) => (
          <Card key={card.label} style={styles.profileStatCard} theme={theme}>
            <Feather color={theme.colors.tealTint} name={card.icon} size={22} />
            <View style={styles.profileCardCopy}>
              <Text style={[styles.profileCardLabel, { color: theme.colors.textMuted }]}>{card.label}</Text>
              <Text style={[styles.profileCardValue, { color: theme.colors.tealTint }]}>{card.value}</Text>
            </View>
          </Card>
        ))}
      </View>

      {profileHighlights.map((highlight) => (
        <Card key={highlight.title} style={styles.profileHighlightCard} theme={theme}>
          <Text style={[styles.profileHighlightTitle, { color: theme.colors.text }]}>
            {highlight.title}
          </Text>
          <Text style={[styles.profileHighlightBody, { color: theme.colors.textMuted }]}>
            {highlight.body}
          </Text>
        </Card>
      ))}

      <Card style={styles.goalCard} theme={theme}>
        <View style={styles.goalCopy}>
          <Text style={[styles.goalTitle, { color: theme.colors.text }]}>Set your 2026 goal</Text>
          <Text style={[styles.goalDescription, { color: theme.colors.textMuted }]}>
            You tried 153 spots in 2025. Pick a target and keep the dark mode preview interactive.
          </Text>
          <View style={styles.goalOptions}>
            {goalOptions.map((option) => {
              const isActive = selectedGoal === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => setSelectedGoal(option)}
                  style={[
                    styles.goalChip,
                    {
                      backgroundColor: isActive ? theme.colors.teal : "transparent",
                      borderColor: isActive ? theme.colors.teal : theme.colors.inputBorder,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.goalChipText,
                      { color: isActive ? theme.colors.white : theme.colors.textMuted },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={[styles.goalProgress, { color: theme.colors.tealTint }]}>
            Current selection: {selectedGoal}
          </Text>
        </View>
        <View style={styles.goalTrophy}>
          <Feather color={theme.colors.trophyDark} name="award" size={38} />
        </View>
      </Card>
    </ScrollView>
  );
}

function IconAction({
  theme,
  icon,
  onPress,
  active = false,
}: {
  theme: Theme;
  icon: React.ComponentProps<typeof Feather>["name"];
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.72 : 1 }]}>
      <Feather color={active ? theme.colors.tealTint : theme.colors.text} name={icon} size={18} />
    </Pressable>
  );
}

function toggleLabel(current: string[], label: string) {
  return current.includes(label)
    ? current.filter((value) => value !== label)
    : [...current, label];
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  device: {
    borderRadius: 28,
    borderWidth: 1,
    flex: 1,
    maxWidth: 430,
    overflow: "hidden",
    width: "100%",
  },
  deviceFloating: {
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 30,
  },
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  screenScroll: {
    paddingTop: 2,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  topBarActions: {
    flexDirection: "row",
    gap: 10,
  },
  homeCard: {
    marginHorizontal: 20,
    marginTop: 4,
    padding: 16,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  inviteSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  featureScroller: {
    gap: 12,
    paddingVertical: 14,
  },
  featureItem: {
    alignItems: "center",
    width: 82,
  },
  featureIconWrap: {
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1.5,
    height: 68,
    justifyContent: "center",
    marginBottom: 10,
    width: 68,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
    textAlign: "center",
  },
  banner: {
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 12,
    minHeight: 108,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  bannerEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: 4,
  },
  bannerBody: {
    fontSize: 14,
    marginTop: 6,
  },
  horizontalCards: {
    gap: 12,
    paddingHorizontal: 20,
  },
  featuredCard: {
    borderRadius: 16,
    height: 150,
    justifyContent: "flex-end",
    overflow: "hidden",
    width: 206,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredCopy: {
    gap: 4,
    padding: 14,
    zIndex: 1,
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
  },
  featuredSubtitle: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.88,
  },
  feedComposer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  feedComposerInput: {
    borderRadius: 22,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  feedComposerText: {
    fontSize: 14,
  },
  feedPost: {
    borderBottomWidth: 1,
    marginTop: 4,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  feedHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  feedMeta: {
    flex: 1,
  },
  feedHeadline: {
    fontSize: 14,
    lineHeight: 20,
  },
  feedStrong: {
    fontWeight: "700",
  },
  feedSupport: {
    fontSize: 13,
    marginTop: 2,
  },
  feedNotes: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  feedActions: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  feedActionGroup: {
    flexDirection: "row",
    gap: 16,
  },
  feedTimestamp: {
    fontSize: 12,
    marginTop: 10,
  },
  mapBlock: {
    alignItems: "center",
    height: 292,
    justifyContent: "center",
    position: "relative",
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: 16,
    position: "absolute",
    right: 16,
    top: 16,
  },
  mapHeaderActions: {
    flexDirection: "row",
    gap: 10,
  },
  mapLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  restaurantTitle: {
    bottom: 18,
    fontSize: 30,
    fontWeight: "800",
    left: 20,
    position: "absolute",
  },
  restaurantInfo: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  restaurantScoreRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  restaurantScoreText: {
    fontSize: 14,
  },
  restaurantInfoActions: {
    flexDirection: "row",
    gap: 14,
    marginLeft: "auto",
  },
  restaurantTags: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    marginTop: 12,
  },
  restaurantMeta: {
    fontSize: 15,
    marginTop: 6,
  },
  restaurantSubMeta: {
    fontSize: 14,
    marginTop: 3,
  },
  actionScroller: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  infoCallout: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
  },
  infoCalloutTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  infoCalloutBody: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  sectionBlock: {
    marginTop: 10,
  },
  scoreCardRow: {
    gap: 12,
    paddingHorizontal: 20,
  },
  scoreCard: {
    flexDirection: "row",
    padding: 12,
  },
  scoreCardBadge: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    position: "relative",
  },
  scoreCount: {
    borderRadius: 9,
    bottom: -4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
  },
  scoreCountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
  scoreCardCopy: {
    flex: 1,
    justifyContent: "center",
  },
  scoreCardLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  scoreCardDescription: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  dishCard: {
    width: 170,
  },
  dishTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  dishSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  friendCard: {
    marginHorizontal: 20,
    marginTop: 18,
    padding: 16,
  },
  friendCardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  friendCardBody: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  centerHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    position: "relative",
  },
  centerHeaderLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  centerHeaderActions: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    right: 20,
    top: 1,
  },
  listTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  listTitle: {
    fontSize: 30,
    fontWeight: "700",
  },
  tabScroll: {
    borderBottomWidth: 1,
    gap: 8,
    paddingHorizontal: 14,
  },
  tabItem: {
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabIndicator: {
    borderRadius: 2,
    height: 2,
    marginTop: 8,
    width: "100%",
  },
  filterScroll: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconChip: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  filterChip: {
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "500",
  },
  sortRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  sortLabel: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  sortText: {
    fontSize: 14,
    fontWeight: "600",
  },
  inlineMap: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 8,
    padding: 16,
  },
  inlineMapTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  inlineMapBody: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  listRow: {
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  listMeta: {
    flex: 1,
  },
  listName: {
    fontSize: 17,
    fontWeight: "700",
  },
  listSupport: {
    fontSize: 14,
    marginTop: 2,
  },
  listTiny: {
    fontSize: 13,
    marginTop: 8,
  },
  floatingMapButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 22,
    bottom: 104,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    position: "absolute",
    right: 20,
  },
  floatingMapLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  segmentTabs: {
    borderBottomWidth: 2,
    flexDirection: "row",
  },
  segmentTabItem: {
    alignItems: "center",
    flex: 1,
    paddingBottom: 10,
    paddingTop: 12,
  },
  segmentTabActive: {
    fontSize: 15,
    fontWeight: "700",
  },
  segmentTabInactive: {
    fontSize: 15,
    fontWeight: "500",
  },
  segmentAccent: {
    bottom: -12,
    height: 2.5,
    left: 0,
    position: "absolute",
    right: 0,
  },
  searchInput: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  searchInputField: {
    flex: 1,
    fontSize: 17,
    minHeight: 34,
  },
  locationRow: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 15,
  },
  searchSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  recentRow: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  recentPress: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  recentMeta: {
    flex: 1,
  },
  recentName: {
    fontSize: 16,
    fontWeight: "600",
  },
  recentLocation: {
    fontSize: 13,
    marginTop: 2,
  },
  syncCard: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
  },
  syncIcon: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginRight: 12,
    width: 40,
  },
  syncCopy: {
    flex: 1,
  },
  syncTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  syncLink: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  memberRow: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  memberMeta: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "700",
  },
  memberHandle: {
    fontSize: 13,
    marginTop: 2,
  },
  leaderboardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  leaderboardHeaderActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  leaderboardTitle: {
    fontSize: 30,
    fontWeight: "800",
  },
  inviteButton: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  segmentControl: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    overflow: "hidden",
  },
  segmentControlItem: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  segmentControlLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  leaderboardBodyText: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  schoolCard: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 8,
    padding: 14,
  },
  schoolCopy: {
    flex: 1,
    marginHorizontal: 12,
  },
  schoolTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  schoolDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  leaderboardRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rankLabel: {
    fontSize: 16,
    width: 20,
  },
  handleLabel: {
    flex: 1,
    fontSize: 16,
  },
  handleScore: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
  },
  profileAvatarWrap: {
    alignItems: "center",
    paddingTop: 10,
  },
  profileAvatar: {
    alignItems: "center",
    borderRadius: 52,
    borderWidth: 3,
    height: 104,
    justifyContent: "center",
    width: 104,
  },
  profileAvatarText: {
    fontSize: 28,
    fontWeight: "700",
  },
  profileInfo: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  profileHandle: {
    fontSize: 19,
    fontWeight: "700",
  },
  profileMeta: {
    fontSize: 13,
    marginTop: 4,
  },
  profileBio: {
    fontSize: 15,
    marginTop: 6,
  },
  profileSchool: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  profileSchoolText: {
    fontSize: 14,
    fontWeight: "700",
  },
  profileStats: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  profileStat: {
    flex: 1,
  },
  profileStatValue: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  profileStatLabel: {
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
  profileActions: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  profileButton: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  profileButtonSmall: {
    paddingHorizontal: 12,
  },
  profileButtonText: {
    fontSize: 15,
    fontWeight: "500",
  },
  profileRows: {
    borderTopWidth: 1,
    marginTop: 18,
  },
  profileRow: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileRowLabel: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
  },
  profileRowValue: {
    fontSize: 17,
    fontWeight: "700",
  },
  profileCardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  profileStatCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    minWidth: "47%",
    padding: 16,
    width: "48%",
  },
  profileCardCopy: {
    flex: 1,
  },
  profileCardLabel: {
    fontSize: 13,
  },
  profileCardValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 2,
  },
  profileHighlightCard: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
  },
  profileHighlightTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  profileHighlightBody: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  goalCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
  },
  goalCopy: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  goalDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  goalOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  goalChip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  goalChipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  goalProgress: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 12,
  },
  goalTrophy: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});
