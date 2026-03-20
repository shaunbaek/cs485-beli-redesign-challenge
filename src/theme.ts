export type ThemeName = "light" | "dark";

type ThemeColors = {
  canvas: string;
  background: string;
  card: string;
  cardAlt: string;
  elevated: string;
  text: string;
  textMuted: string;
  textSoft: string;
  teal: string;
  tealTint: string;
  red: string;
  border: string;
  navBackground: string;
  navOff: string;
  navOn: string;
  searchBackground: string;
  inputBorder: string;
  banner: string;
  overlay: string;
  white: string;
  black: string;
  trophy: string;
  trophyDark: string;
  shadowBase: string;
};

export type Theme = {
  name: ThemeName;
  colors: ThemeColors;
};

const shared = {
  teal: "#2B6B5F",
};

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: "light",
    colors: {
      canvas: "#E7E4DF",
      background: "#FFFFFF",
      card: "#F5F5F5",
      cardAlt: "#F8F8F8",
      elevated: "#EBEBEB",
      text: "#1A1A1A",
      textMuted: "#8E8E93",
      textSoft: "#C0C0C5",
      teal: shared.teal,
      tealTint: "#2B6B5F",
      red: "#E05050",
      border: "#EDEDF0",
      navBackground: "#FFFFFF",
      navOff: "#8E8E93",
      navOn: "#1A1A1A",
      searchBackground: "#F2F2F7",
      inputBorder: "#DDDDE0",
      banner: "#FBDDD8",
      overlay: "rgba(0, 0, 0, 0.16)",
      white: "#FFFFFF",
      black: "#000000",
      trophy: "#F5A623",
      trophyDark: "#E09415",
      shadowBase: "#111111",
    },
  },
  dark: {
    name: "dark",
    colors: {
      canvas: "#0E0F10",
      background: "#1C1C1E",
      card: "#2C2C2E",
      cardAlt: "#262628",
      elevated: "#3A3A3C",
      text: "#FFFFFF",
      textMuted: "#98989D",
      textSoft: "#555555",
      teal: shared.teal,
      tealTint: "#4CB5A5",
      red: "#FF6B6B",
      border: "#38383A",
      navBackground: "#1C1C1E",
      navOff: "#636366",
      navOn: "#FFFFFF",
      searchBackground: "#2C2C2E",
      inputBorder: "#48484A",
      banner: "#3A2825",
      overlay: "rgba(0, 0, 0, 0.35)",
      white: "#FFFFFF",
      black: "#000000",
      trophy: "#F5A623",
      trophyDark: "#E09415",
      shadowBase: "#000000",
    },
  },
};

export const getTheme = (themeName: ThemeName): Theme => themes[themeName];
