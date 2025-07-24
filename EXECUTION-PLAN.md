# EXECUTION-PLAN.md
## Navana – Development Plan (Minimal & Actionable)

A step-by-step execution strategy for building the Navana app using Expo + React Native + TypeScript, following APP-DESIGN-GUIDELINES.md.

---


# Original task 

## Objective

Build a mobile or web app that allows **authenticated users** to select two points (A and B) and view an **optimized route** between them.

You must define the optimization criteria (e.g., shortest distance, least time). Keep it focused, functional, and easy to walk through.

---

## Tech Stack (You Choose)

- **Frontend**: React Native (mobile) or React (web)
- **Map Libraries**:
  - Mobile: `react-native-maps`
  - Web: `react-leaflet` or `@react-google-maps/api`
- **Routing APIs**:
  - Google Directions API or Mapbox Directions API
- **Authentication**:
  - Google login or email/password
  - Use Firebase Auth, Supabase, or your own backend

---

## Core Requirements

### 🔐 Step 1: Authentication
- Login screen using Google or email/password
- Only authenticated users can access the main app screen

### 🗺 Step 2: Map + Route
- Display a map interface
- Let user select or enter Point A and Point B
- Draw a route between them using a routing API

### 🧠 Step 3: Optimization
- Suggest the best route based on distance or time
- Optimization logic should be extensible

---

## Bonus Features (Optional)
- Use current location as default Point A
- Show distance and estimated travel time
- Responsive design or loading states


# Plan



## 1. Setup

- [ x ] Initialize project: `npx create-expo-app auth-map-app --template blank-typescript`
- [ x ] Set up folder structure (`components/`, `screens/`, `services/`, `stores/`, `theme/`)
- [ ] Install dependencies:
  - Navigation: `@react-navigation/native`, `@react-navigation/stack`
  - Firebase + Auth: `firebase`, `@react-native-google-signin/google-signin`
  - Maps: `react-native-maps`, `expo-location`
  - State: `zustand`
  - HTTP: `axios`
- [ ] Create `.env` and configure Firebase + Google Maps API keys
- [ ] Add base theme file in `theme/index.ts`

---

## 2. Authentication

- [ ] Create `LoginScreen.tsx`, `SignUpScreen.tsx`, `LoadingScreen.tsx`
- [ ] Setup `authStore.ts` using Zustand for login/logout state
- [ ] Configure Firebase auth (email + Google)
- [ ] Guard routes based on user state
- [ ] Use stack navigator for auth flow

---

## 3. Map & Routing

- [ ] Create `MapScreen.tsx` with full-screen map
- [ ] Use current location as Point A
- [ ] Allow user to select Point B (tap or search)
- [ ] Show markers for both points
- [ ] Call Directions API for route
- [ ] Draw polyline and show duration/distance

---

## 4. UI Components

- [ ] Build reusable components:
  - `Button`, `InputField`, `Card`, `LoadingSpinner`, `RouteInfoCard`
- [ ] Apply design tokens (colors, spacing, typography)
- [ ] Style screens using theme values

---

## 5. Testing & Polish

- [ ] Test login/sign-up flows
- [ ] Test location access and route drawing
- [ ] Confirm layout on Android and iOS devices
- [ ] Handle loading, error, and empty states
- [ ] Final UI pass for spacing, colors, consistency

---

## 6. Wrap-up

- [ ] Finalize `README.md` with setup, usage, and env info
- [ ] Confirm `.env` is gitignored
- [ ] Push clean repo to GitHub

---

## MVP Checklist

- [ ] Auth via Firebase (email & Google)
- [ ] Map with A → B selection
- [ ] Optimized route display
- [ ] Distance & duration shown
- [ ] UI matches design guidelines

