import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import type { Theme } from "../theme";

type IconName = React.ComponentProps<typeof Feather>["name"];

export type NavRoute =
  | "home"
  | "lists"
  | "search"
  | "leaderboard"
  | "profile";

export function StatusStrip({ theme }: { theme: Theme }) {
  return (
    <View style={styles.statusBar}>
      <Text style={[styles.statusTime, { color: theme.colors.text }]}>9:41</Text>
      <View style={styles.statusIcons}>
        <Feather color={theme.colors.text} name="bar-chart-2" size={14} />
        <Feather color={theme.colors.text} name="wifi" size={14} />
        <Feather color={theme.colors.text} name="battery" size={16} />
      </View>
    </View>
  );
}

export function BeliWordmark({ theme }: { theme: Theme }) {
  return <Text style={[styles.wordmark, { color: theme.colors.tealTint }]}>beli</Text>;
}

type IconButtonProps = {
  theme: Theme;
  icon: IconName;
  onPress?: () => void;
  badge?: string;
  size?: number;
  filled?: boolean;
  accent?: boolean;
};

export function IconButton({
  theme,
  icon,
  onPress,
  badge,
  size = 18,
  filled = false,
  accent = false,
}: IconButtonProps) {
  const foreground = accent ? theme.colors.white : theme.colors.text;
  const background = accent ? theme.colors.teal : filled ? theme.colors.card : "transparent";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        {
          backgroundColor: background,
          borderColor: filled ? theme.colors.border : "transparent",
          opacity: pressed ? 0.72 : 1,
        },
      ]}
    >
      <Feather color={foreground} name={icon} size={size} />
      {badge ? (
        <View style={[styles.badge, { backgroundColor: theme.colors.red }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function ThemeToggleButton({
  theme,
  isDark,
  onPress,
}: {
  theme: Theme;
  isDark: boolean;
  onPress: () => void;
}) {
  return (
    <IconButton
      accent
      icon={isDark ? "sun" : "moon"}
      onPress={onPress}
      theme={theme}
    />
  );
}

export function SearchBar({
  theme,
  placeholder,
  onPress,
}: {
  theme: Theme;
  placeholder: string;
  onPress?: () => void;
}) {
  const content = (
    <>
      <Feather color={theme.colors.textMuted} name="search" size={16} />
      <Text style={[styles.searchText, { color: theme.colors.textMuted }]}>{placeholder}</Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.searchBar,
          { backgroundColor: theme.colors.searchBackground, opacity: pressed ? 0.82 : 1 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.searchBar, { backgroundColor: theme.colors.searchBackground }]}>{content}</View>;
}

type ChipItem = {
  label: string;
  icon?: IconName;
};

export function PillsRow({
  items,
  theme,
  filled = true,
  contentStyle,
  selectedLabels,
  onPressLabel,
}: {
  items: ReadonlyArray<ChipItem>;
  theme: Theme;
  filled?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  selectedLabels?: readonly string[];
  onPressLabel?: (label: string) => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={[styles.pillsRow, contentStyle]}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {items.map((item) => (
        <Pill
          filled={filled}
          icon={item.icon}
          key={item.label}
          label={item.label}
          onPress={onPressLabel ? () => onPressLabel(item.label) : undefined}
          selected={selectedLabels?.includes(item.label)}
          theme={theme}
        />
      ))}
    </ScrollView>
  );
}

export function Pill({
  theme,
  label,
  icon,
  filled = true,
  selected = true,
  onPress,
}: {
  theme: Theme;
  label: string;
  icon?: IconName;
  filled?: boolean;
  selected?: boolean;
  onPress?: () => void;
}) {
  const isFilled = filled && selected;
  const backgroundColor = isFilled ? theme.colors.teal : "transparent";
  const textColor = isFilled ? theme.colors.white : theme.colors.textMuted;
  const borderColor = isFilled ? theme.colors.teal : theme.colors.inputBorder;
  const content = (
    <>
      {icon ? <Feather color={textColor} name={icon} size={13} /> : null}
      <Text style={[styles.pillText, { color: textColor }]}>{label}</Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pill,
          { backgroundColor, borderColor, opacity: pressed ? 0.78 : 1 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.pill, { backgroundColor, borderColor }]}>{content}</View>;
}

export function SectionHeader({
  theme,
  title,
  action,
}: {
  theme: Theme;
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
      {action ? <Text style={[styles.sectionAction, { color: theme.colors.tealTint }]}>{action}</Text> : null}
    </View>
  );
}

export function ScoreBadge({
  theme,
  value,
  filled = false,
  size = 42,
}: {
  theme: Theme;
  value: string;
  filled?: boolean;
  size?: number;
}) {
  const textStyle: TextStyle = {
    color: filled ? theme.colors.white : theme.colors.tealTint,
    fontSize: size > 42 ? 18 : 15,
  };

  return (
    <View
      style={[
        styles.scoreBadge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: filled ? theme.colors.teal : "transparent",
          borderColor: theme.colors.tealTint,
        },
      ]}
    >
      <Text style={[styles.scoreText, textStyle]}>{value}</Text>
    </View>
  );
}

export function Avatar({
  theme,
  label,
  background,
  size = 40,
}: {
  theme: Theme;
  label: string;
  background?: string;
  size?: number;
}) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: background ?? theme.colors.elevated,
        },
      ]}
    >
      <Text
        style={[
          styles.avatarText,
          { color: theme.colors.textMuted, fontSize: size < 32 ? 10 : size > 48 ? 18 : 14 },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export function Card({
  children,
  theme,
  style,
}: {
  children: React.ReactNode;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadowBase,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function PrimaryButton({
  theme,
  label,
  onPress,
}: {
  theme: Theme;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor: theme.colors.teal, opacity: pressed ? 0.82 : 1 },
      ]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function OutlineButton({
  theme,
  label,
  icon,
  style,
  onPress,
  selected = false,
}: {
  theme: Theme;
  label: string;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  selected?: boolean;
}) {
  const color = selected ? theme.colors.white : theme.colors.tealTint;
  const backgroundColor = selected ? theme.colors.teal : "transparent";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.outlineButton,
        { borderColor: theme.colors.tealTint, backgroundColor, opacity: pressed ? 0.8 : 1 },
        style,
      ]}
    >
      {icon ? <Feather color={color} name={icon} size={14} /> : null}
      <Text style={[styles.outlineButtonText, { color }]}>{label}</Text>
    </Pressable>
  );
}

export function PlaceholderBlock({
  theme,
  label,
  height = 120,
  color,
}: {
  theme: Theme;
  label: string;
  height?: number;
  color?: string;
}) {
  return (
    <View
      style={[
        styles.placeholder,
        { backgroundColor: color ?? theme.colors.elevated, height },
      ]}
    >
      <Text style={[styles.placeholderText, { color: theme.colors.textSoft }]}>{label}</Text>
    </View>
  );
}

export function BottomNav({
  theme,
  active,
  onNavigate,
}: {
  theme: Theme;
  active?: NavRoute;
  onNavigate: (route: NavRoute) => void;
}) {
  const items: Array<{ route: NavRoute; label: string; icon: IconName }> = [
    { route: "home", label: "Feed", icon: "file-text" },
    { route: "lists", label: "Lists", icon: "list" },
    { route: "search", label: "Search", icon: "plus" },
    { route: "leaderboard", label: "Board", icon: "award" },
    { route: "profile", label: "Profile", icon: "user" },
  ];

  return (
    <View style={[styles.bottomNav, { backgroundColor: theme.colors.navBackground, borderColor: theme.colors.border }]}>
      {items.map((item) => {
        const isActive = active === item.route;
        const isSearch = item.route === "search";
        const iconColor = isSearch
          ? theme.colors.white
          : isActive
            ? theme.colors.navOn
            : theme.colors.navOff;
        const labelColor = isActive ? theme.colors.navOn : theme.colors.navOff;

        return (
          <Pressable
            key={item.route}
            onPress={() => onNavigate(item.route)}
            style={({ pressed }) => [
              styles.navItem,
              {
                backgroundColor: isActive ? theme.colors.background : "transparent",
                borderColor: isActive ? theme.colors.tealTint : "transparent",
                opacity: pressed ? 0.72 : 1,
              },
            ]}
          >
            {isSearch ? (
              <View style={[styles.searchNavButton, { backgroundColor: theme.colors.teal }]}>
                <Feather color={iconColor} name={item.icon} size={18} />
              </View>
            ) : (
              <Feather color={iconColor} name={item.icon} size={18} />
            )}
            <Text style={[styles.navLabel, { color: labelColor }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    alignItems: "center",
    flexDirection: "row",
    height: 46,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  statusTime: {
    fontSize: 15,
    fontWeight: "600",
  },
  statusIcons: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  wordmark: {
    fontFamily: "Georgia",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  iconButton: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    position: "relative",
    width: 34,
  },
  badge: {
    alignItems: "center",
    borderRadius: 8,
    height: 15,
    justifyContent: "center",
    minWidth: 15,
    paddingHorizontal: 4,
    position: "absolute",
    right: -4,
    top: -3,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
  searchBar: {
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchText: {
    fontSize: 15,
  },
  pillsRow: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pill: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: "500",
  },
  scoreBadge: {
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
  },
  scoreText: {
    fontWeight: "700",
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontWeight: "700",
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  primaryButton: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  outlineButton: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  outlineButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  placeholder: {
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: "600",
  },
  bottomNav: {
    borderTopWidth: 1,
    flexDirection: "row",
    height: 94,
    justifyContent: "space-around",
    paddingTop: 10,
  },
  navItem: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    gap: 4,
    paddingTop: 6,
    width: 74,
  },
  searchNavButton: {
    alignItems: "center",
    borderRadius: 18,
    height: 34,
    justifyContent: "center",
    width: 44,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
});
