# App Design Guidelines – Single Source of Truth

> ✅ Authoritative answers to essential design questions for consistent, scalable mobile app development.

---

## 🎨 Visual Identity & Aesthetics

### 1. What is the app's brand personality?
Modern and approachable – Clean, professional interface with friendly micro-interactions. Emphasizes clarity and ease of use while maintaining visual sophistication.

### 2. What is the primary color palette?
- **Primary**: Blue `#007AFF`
- **Secondary**: Gray `#8E8E93`
- **Accent**: Green `#34C759`
- **Neutral**: Light Gray `#F2F2F7`, Dark Gray `#1C1C1E`
- **Error**: Red `#FF3B30`

### 3. Is there a light/dark mode design spec?
Yes. Follow system preference by default, with a manual toggle. Dark mode uses true black `#000000` for backgrounds and `#1C1C1E` for surfaces.

### 4. What typography is being used?
- **Font Family**: System (San Francisco on iOS, Roboto on Android)
- **Headings**: 28sp, 24sp, 20sp (Semibold)
- **Body Text**: 16sp, 14sp (Regular)
- **Captions**: 12sp (Regular)
- **Note**: Support Dynamic Type and font scaling.

### 5. Are there specific icon sets or custom icons used?
SF Symbols (iOS), Material Icons (Android), custom SVGs use 2px stroke width. Sizes: 24px standard, 20px for compact UIs.

### 6. Is there a defined spacing scale or grid system?
8pt grid system: use spacing of `4`, `8`, `16`, `24`, `32`, `40`. Base unit = 16px padding inside components.

---

## 📱 UI/UX Consistency

### 7. What is the standard button style?
- **Primary**: Rounded rectangle, 8px radius, blue fill, white text, min height 44px
- **Secondary**: 1px outline, blue text, transparent background

### 8. How should input fields behave and look?
- Floating labels, 6px radius
- Focus: blue border
- Error: red border + message
- Padding: 16px horizontal, 12px vertical

### 9. What's the consistent card or list item layout style?
- Elevated cards: 8px radius, 1px shadow, 16px padding
- List items: 12px vertical padding, 16px horizontal, divider below

### 10. What are the conventions for modals, bottom sheets, and alerts?
- Bottom sheets for mobile, centered modals for tablets
- 16px top corner radius
- Backdrop: black @ 40% opacity
- Alerts: system dialogs with up to 3 actions

### 11. Are there reusable visual patterns or components?
Yes:
- **Spinner**: system default
- **Tags**: 4px radius, 6px padding
- **Badges**: red dot with white text
- **Chips**: outlined, pill-shaped, 16px radius

### 12. Is there a guideline for text alignment and padding?
- Text: left-aligned
- 16px margin from edges
- 8px line spacing, 16px between sections

---

## 📐 Layout & Responsiveness

### 13. What screen sizes are supported?
Mobile-first: 360–430px width. Tablet support optional.

### 14. Should the layout be responsive or adaptive?
Responsive: Use percentage widths and flex layouts with max-width caps.

### 15. How is content handled on smaller screens or in landscape?
- Hide non-essentials
- Compact spacing (−25% vertical)
- Use horizontal layouts where possible

### 16. What happens in empty states or error views?
- Centered illustration + title + description
- Clear CTA to resolve the issue
- Friendly tone of voice

### 17. How are scrollable views styled?
- Native momentum scroll
- Pull-to-refresh on lists
- Hide scrollbars
- Fade out content edges

---

## 🔁 State, Navigation & Feedback

### 18. What is the primary navigation structure?
Tab bar (3–5 main sections) + Stack navigation inside tabs. Drawer for optional sections.

### 19. What should navigation transitions look like?
- Stack: Slide (300ms)
- Tabs: Crossfade (200ms)
- Modal: Slide from bottom

### 20. How should loading states appear?
- Skeleton for screen load
- Shimmer for lists
- Spinner for actions
- Avoid full-screen blocks unless essential

### 21. What kind of feedback is shown after user actions?
- Toasts (bottom on iOS, top on Android)
- Inline success/error messages
- Haptic feedback on taps

### 22. How are app errors or validation issues shown?
- Inline red messages under fields
- Dismissible network banners at top
- Alerts for blocking errors

---

## ♿ Accessibility & Internationalization

### 23. Is accessibility required?
Yes – WCAG 2.1 AA:
- Min 44px tap targets
- 4.5:1 color contrast
- Screen reader labels
- Support dynamic type

### 24. Will the app support multiple languages?
English only at launch, but RTL and i18n structure should be prepared.

---

## 🧩 Design Tokens & Dev Efficiency

### 25. Is there a centralized theme file?
Yes – `theme.ts` with all colors, spacing, typography, and component styles.

### 26. Are design tokens defined?
Yes:
```ts
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const colors = { primary: "#007AFF", error: "#FF3B30", ... };
export const typography = { heading1: 28, body1: 16, caption: 12 };
```

### 27. Is there a shared component library?
Yes – includes Button, Input, Card, ListItem, Modal, Header.


### 28. Is there a naming convention?
- **Components**: PascalCase
- **Files**: kebab-case.tsx
- **Assets**: icon-, img-, logo-
- **Classes** (if any): BEM