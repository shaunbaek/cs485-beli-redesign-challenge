# Beli Dark Mode React Native Demo

This workspace now includes a small Expo + React Native app that recreates the six provided Beli HTML screens and adds a reusable dark mode implementation.

## What is included

- `App.tsx`
  Screen composition and lightweight in-app routing.
- `src/theme.ts`
  Shared light and dark design tokens derived from the exported CSS variables.
- `src/data.ts`
  Static content used across the recreated screens.
- `src/components/ui.tsx`
  Reusable primitives such as headers, pills, cards, score badges, avatars, and the bottom nav.

## Run it

1. Install dependencies:

```bash
npm install
```

2. Start the Expo app:

```bash
npx expo start
```

3. Open it in Expo Go, the iOS simulator, Android emulator, or the web preview.

## Notes

- The HTML files remain in place as the design reference source.
- The app uses a manual light/dark toggle on every recreated screen so the dark mode work is easy to inspect.
- Navigation is intentionally lightweight and state-based so the dark mode implementation stays easy to iterate on without extra routing setup.
