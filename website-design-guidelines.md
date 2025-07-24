# Website Design Guidelines – Kleisli Labs

> ✅ Comprehensive design system for Kleisli Labs' AI consulting website, answering all essential design questions for consistent, professional web development.

---

## 🎨 Visual Identity & Aesthetics

### 1. What is the brand personality?
**"Igniting Early-Stage AI Ventures"** – Professional yet energetic, combining technical expertise with startup dynamism. We balance trustworthiness and reliability with innovation and forward-thinking energy. The personality conveys confidence without being intimidating, approachable without being casual.

### 2. What is the primary color palette?
- **Primary**: Navy Blue `#102A43` (trust, reliability, technical depth)
- **Accent**: Flame Orange `#FF6F61` (energy, ignition, urgency)
- **Highlight**: Teal `#0EDDAA` (innovation, growth, freshness)
- **Background**: Light Gray `#F7FAFC` (clean, professional)
- **Text Primary**: Dark Gray `#1C1C1E` (high readability)
- **Text Secondary**: Medium Gray `#6B7280` (supporting content)
- **Error**: Red `#EF4444` (clear warnings)
- **Success**: Green `#10B981` (positive feedback)
- **Info**: Blue `#3B82F6` (informational)
- **Warning**: Amber `#F59E0B` (caution)

### 3. Is there a light/dark mode design spec?
Yes. Light mode is primary (professional B2B preference). Dark mode optional with adjusted colors:
- Dark Background: `#0F0F0F`
- Dark Surface: `#1A1A1A`
- Dark Border: `#2A2A2A`
- Adjusted text colors for proper contrast
- System preference detection with manual toggle

### 4. What typography is being used?
- **Font Stack**: 
  - Primary: Inter
  - Fallback: Roboto, Poppins, system-ui, -apple-system, sans-serif
- **Type Scale** (1.25 modular scale):
  - H1: 48px/1.1 (3rem) - Hero headlines only
  - H2: 36px/1.2 (2.25rem) - Major section titles
  - H3: 28px/1.3 (1.75rem) - Subsection headers
  - H4: 22px/1.4 (1.375rem) - Card titles
  - H5: 18px/1.5 (1.125rem) - Minor headings
  - H6: 16px/1.5 (1rem) - Label headings
  - Body: 16px/1.6 (1rem) - Main content
  - Small: 14px/1.5 (0.875rem) - Captions, meta
  - XSmall: 12px/1.4 (0.75rem) - Legal, disclaimers
- **Font Weights**:
  - Light: 300 (hero text)
  - Regular: 400 (body)
  - Medium: 500 (emphasis)
  - Semibold: 600 (buttons, labels)
  - Bold: 700 (headings)

### 5. Are there specific icon sets or custom icons used?
- **Custom SVG Illustrations**: For AI concepts (neural networks, data flows, automation)
- **Icon Library**: Lucide React for UI icons
- **Style**: Flat/semi-flat, 2px stroke width
- **Sizes**: 16px (inline), 24px (standard), 32px (feature), 48px (hero)
- **Colors**: Use accent colors, ensure 4.5:1 contrast
- **Animation**: Subtle hover effects (rotate, scale)

### 6. Is there a defined spacing scale or grid system?
**8px Base Grid System**:
```typescript
export const spacing = {
  xs: 4,    // 0.25rem
  sm: 8,    // 0.5rem
  md: 16,   // 1rem (default)
  lg: 24,   // 1.5rem
  xl: 32,   // 2rem
  xxl: 40,  // 2.5rem
  xxxl: 48, // 3rem
  huge: 64  // 4rem
};
```
- Container max-width: 1280px
- Content max-width: 960px (reading)
- Gutter: 16px (mobile), 24px (desktop)

---

## 📱 UI/UX Consistency

### 7. What is the standard button style?
**Primary Button**:
- Background: Orange `#FF6F61`
- Text: White `#FFFFFF`
- Border-radius: 8px
- Padding: 16px 24px
- Font: 600 weight, 16px
- Min-height: 44px
- Hover: Darken 10%, scale(1.02), shadow
- Active: scale(0.98)
- Disabled: 50% opacity
- Transition: all 200ms ease

**Secondary Button**:
- Background: Transparent
- Border: 1px solid Navy `#102A43`
- Text: Navy `#102A43`
- Same sizing as primary
- Hover: Navy background, white text

**Ghost Button**:
- No border, transparent bg
- Text: Navy or current color
- Hover: Light gray background

### 8. How should input fields behave and look?
- **Default State**:
  - Border: 1px solid `#E5E7EB`
  - Background: White
  - Border-radius: 6px
  - Padding: 12px 16px
  - Font-size: 16px (prevents zoom on mobile)
- **Focus State**:
  - Border: 2px solid Orange `#FF6F61`
  - Outline: none
  - Box-shadow: 0 0 0 3px rgba(255,111,97,0.1)
- **Error State**:
  - Border: 2px solid Red `#EF4444`
  - Error message below in red
  - Icon indicator (optional)
- **Success State**:
  - Border: 2px solid Green `#10B981`
  - Success icon (checkmark)
- **Disabled**: 50% opacity, cursor not-allowed

### 9. What's the consistent card or list item layout style?
**Card Components**:
- Background: White (light mode) / `#1A1A1A` (dark)
- Border: 1px solid `#E5E7EB`
- Border-radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: Lift effect (translateY(-2px)), stronger shadow
- Transition: all 300ms ease

**Card Types**:
- **ServiceCard**: Icon (48px), H3 title, description, "Learn more" link
- **TestimonialCard**: Quote, author photo, name, company, rating
- **BlogCard**: Featured image, category tag, title, excerpt, date
- **StatCard**: Large number, label, trend indicator

### 10. What are the conventions for modals, bottom sheets, and alerts?
**Modals**:
- Centered vertically and horizontally
- Max-width: 600px (form modals), 400px (alerts)
- Background overlay: Black 40% opacity
- Border-radius: 16px
- Padding: 32px
- Close button (X) top-right
- Fade in animation: 200ms
- Escape key closes

**Alerts/Toasts**:
- Position: Top-right, 24px from edge
- Auto-dismiss: 5 seconds
- Types: Success (green), Error (red), Info (blue), Warning (amber)
- Can be manually dismissed
- Slide in from right animation

### 11. Are there reusable visual patterns or components?
**Component Library**:
- **Badge**: Small rounded pill, colored backgrounds
- **Tag**: Outlined pill for categories
- **Tooltip**: Dark bg, white text, arrow pointer
- **Progress**: Linear or circular indicators
- **Skeleton**: Loading placeholders
- **Divider**: 1px gray line with optional text
- **Avatar**: Circular image with fallback initials
- **Breadcrumb**: Navigation trail
- **Tabs**: Underline or pill style
- **Accordion**: Expandable content sections

### 12. Is there a guideline for text alignment and padding?
- **Alignment**: Left-aligned by default (better readability)
- **Center**: Only for hero sections, CTAs, short headings
- **Right**: Only for opposing actions or metadata
- **Padding**:
  - Mobile: 16px horizontal padding
  - Desktop: 24px minimum from viewport edge
  - Between sections: 64px (mobile), 96px (desktop)
  - Within components: 16px standard
  - Line height: 1.6 for body text
- **Max line length**: 75 characters for optimal reading

---

## 📐 Layout & Responsiveness

### 13. What screen sizes are supported?
**Breakpoints**:
```scss
$mobile: 360px;    // Minimum supported
$tablet: 768px;    // iPad portrait
$desktop: 1024px;  // Desktop/laptop
$large: 1440px;    // Large screens
$xlarge: 1920px;   // Extra large

// Container widths
$container-sm: 640px;
$container-md: 768px;
$container-lg: 1024px;
$container-xl: 1280px;
```

### 14. Should the layout be responsive or adaptive?
**Responsive** with fluid grids:
- 12-column grid system
- Flexible images and media
- Relative units (rem, %, vw)
- CSS Grid and Flexbox layouts
- Mobile-first approach
- Progressive enhancement

### 15. How is content handled on smaller screens?
**Mobile Optimizations**:
- Single column layouts
- Stacked navigation (hamburger menu)
- Larger touch targets (min 44px)
- Simplified graphics
- Accordion for long content
- Horizontal scrolling for data tables
- Bottom sheets instead of modals
- Reduced animations
- Prioritized content (hide non-essential)

### 16. What happens in empty states or error views?
**Empty States**:
- Friendly illustration (custom SVG)
- Clear heading explaining the state
- Helpful description (what and why)
- Primary action button to resolve
- Secondary help links if needed
- Consistent tone: helpful, not blaming

**Error States**:
- 404: Custom illustration, search bar, popular links
- 500: Simple message, contact support
- Network: Offline indicator, retry button
- Form errors: Inline validation, summary at top

### 17. How are scrollable views styled and handled?
- **Custom scrollbar** (desktop):
  - Width: 8px
  - Track: Light gray
  - Thumb: Medium gray, darker on hover
- **Smooth scrolling**: For anchor links
- **Scroll indicators**: For horizontal scroll areas
- **Sticky elements**: Header after 50px scroll
- **Parallax**: Subtle, performance-conscious
- **Infinite scroll**: With loading indicators
- **Back to top**: Button appears after 400px scroll

---

## 🔁 State, Navigation & Feedback

### 18. What is the primary navigation structure?
**Desktop Navigation**:
- Sticky header with logo left, nav center, CTA right
- Main sections: Home, Services, About, Blog, Contact
- Smooth scroll to page sections
- Active section highlighting
- Dropdown for sub-navigation (if needed)

**Mobile Navigation**:
- Hamburger menu (three lines)
- Full-screen overlay
- Logo and close button at top
- Vertical menu list
- Contact info at bottom
- Smooth open/close animation

### 19. What should navigation transitions look like?
- **Page Sections**: Fade up on scroll (300ms ease-out)
- **Menu Open**: Slide from right (mobile) 250ms
- **Hover States**: Color/bg change 150ms
- **Active States**: Immediate feedback
- **Route Changes**: Fade transition 200ms
- **Scroll Reveal**: Stagger children 100ms delay
- **Loading**: Skeleton screens, no layout shift

### 20. How should loading states appear?
**Loading Patterns**:
- **Page Load**: Skeleton screens matching layout
- **Data Fetch**: Inline spinners
- **Image Load**: Blur-up technique
- **Lazy Load**: Intersection Observer
- **Submit Actions**: Button spinner + disabled
- **Progress**: Linear bar for multi-step
- **Shimmer Effect**: For content placeholders

### 21. What kind of feedback is shown after user actions?
**Feedback Types**:
- **Success**: Green toast, checkmark icon, 5s duration
- **Error**: Red toast, X icon, stays until dismissed
- **Info**: Blue toast, info icon, 5s duration
- **Form Submit**: Success message + clear form
- **Copy Action**: "Copied!" tooltip
- **Delete**: Confirmation modal first
- **Save**: Inline "Saved" indicator
- **Hover**: Visual change (color, elevation)
- **Click**: Ripple effect (subtle)

### 22. How are app errors or form validation errors displayed?
**Form Validation**:
- **Real-time**: On blur for individual fields
- **On Submit**: Show all errors with summary
- **Error Style**: Red border, red text below field
- **Error Icon**: Optional exclamation mark
- **Success**: Green checkmark when fixed
- **Password**: Strength indicator
- **Required**: Asterisk (*) in label

**System Errors**:
- **API Errors**: User-friendly message + retry
- **Network**: "Check connection" banner
- **Permission**: Clear explanation + action
- **Timeout**: Auto-retry with indicator

---

## ♿ Accessibility & Internationalization

### 23. Is accessibility a requirement?
**Yes – WCAG 2.1 AA Compliance**:
- **Color Contrast**: 4.5:1 minimum (7:1 for AAA)
- **Focus Indicators**: Visible outline, 3px
- **Keyboard Navigation**: All interactive elements
- **Screen Readers**: Proper ARIA labels
- **Alt Text**: Descriptive for all images
- **Semantic HTML**: Proper heading hierarchy
- **Skip Links**: "Skip to content"
- **Touch Targets**: 44x44px minimum
- **Motion**: Respect prefers-reduced-motion
- **Errors**: Clear descriptions, not just color

### 24. Will the app support multiple languages or RTL text?
**Internationalization Ready**:
- English primary language
- i18n structure prepared:
  - Separate translation files
  - Dynamic text replacement
  - Number/date formatting
  - Pluralization support
- RTL support ready:
  - Logical properties (start/end vs left/right)
  - Mirrored layouts
  - RTL-aware icons
- Expandable text areas (1.5x for translations)

---

## 🧩 Design Tokens & Dev Efficiency

### 25. Is there a centralized theme or style constants file?
**Yes – `theme.ts` structure**:
```typescript
export const theme = {
  colors: {
    primary: { navy: '#102A43', orange: '#FF6F61', teal: '#0EDDAA' },
    neutral: { white: '#FFFFFF', gray: { /* scale */ }, black: '#000000' },
    semantic: { error: '#EF4444', success: '#10B981', warning: '#F59E0B' }
  },
  typography: {
    fontFamily: { sans: ['Inter', 'Roboto', 'sans-serif'] },
    fontSize: { xs: '0.75rem', sm: '0.875rem', /* ... */ },
    fontWeight: { light: 300, regular: 400, /* ... */ },
    lineHeight: { tight: 1.1, normal: 1.5, relaxed: 1.6 }
  },
  spacing: { /* 4px scale */ },
  borderRadius: { sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  shadows: { sm: '0 1px 3px rgba(0,0,0,0.1)', /* ... */ },
  breakpoints: { mobile: '360px', tablet: '768px', /* ... */ },
  transitions: { fast: '150ms', normal: '300ms', slow: '500ms' },
  zIndex: { dropdown: 1000, modal: 2000, toast: 3000 }
};
```

### 26. Are design tokens defined?
**Yes – Complete token system**:
- **Primitive Tokens**: Raw values (colors, sizes)
- **Semantic Tokens**: Purpose-based (primary-color, header-height)
- **Component Tokens**: Component-specific (button-padding, card-shadow)
- **Responsive Tokens**: Breakpoint-based values
- **Motion Tokens**: Animation timings and easings
- **Export Format**: CSS variables, JS objects, JSON

### 27. Do we have a shared component library or design system?
**Yes – Component Library includes**:

**Layout Components**:
- StickyHeader
- Footer
- Container
- Grid/Column
- Section

**Content Components**:
- HeroBanner
- ServicesGrid + ServiceCard
- ProcessSection + ProcessStep
- PortfolioGrid + ProjectCard
- TestimonialCarousel + TestimonialCard
- BlogTeasers + BlogCard
- ContactSection + ContactForm
- LogoGrid

**UI Components**:
- Button (variants)
- Input/Textarea
- Select/Dropdown
- Checkbox/Radio
- Modal/Dialog
- Toast/Alert
- Tabs
- Accordion
- Card
- Badge/Tag

### 28. Is there a source of truth for designs?
**Figma as primary source**:
- Master component library
- Design tokens exported
- Auto-generated documentation
- Version control
- Developer handoff specs
- Interactive prototypes
- Design system documentation

### 29. Can the designer provide redlines or specs for each screen?
**Yes – Comprehensive handoff includes**:
- Component specifications
- Spacing measurements  
- Color values and usage
- Typography details
- Interactive states (hover, active, focus)
- Responsive behavior
- Animation details
- Accessibility notes
- Implementation notes

### 30. Is there a naming convention or style guide for components and assets?
**Naming Conventions**:
- **React Components**: PascalCase (`ServiceCard.tsx`)
- **Component Files**: kebab-case (`service-card.tsx`)
- **CSS Classes**: BEM or utility-first (Tailwind)
- **CSS Variables**: kebab-case (`--primary-color`)
- **JS Variables**: camelCase (`primaryColor`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_WIDTH`)
- **Props/Attributes**: camelCase (`isActive`)
- **Events**: camelCase with "on" prefix (`onClick`)
- **Hooks**: camelCase with "use" prefix (`useTheme`)
- **Assets**: kebab-case (`hero-image.svg`)
- **Test Files**: `*.test.ts` or `*.spec.ts`

---

## 🚀 Additional Web-Specific Guidelines

### Performance Standards
- Core Web Vitals compliance
- Image optimization (WebP, lazy loading)
- Code splitting
- CDN usage
- Minification
- Caching strategies
- < 3s initial load time

### SEO Requirements
- Semantic HTML structure
- Proper meta tags
- Open Graph tags
- Structured data
- XML sitemap
- Robots.txt
- Canonical URLs
- Alt text for images

### Animation Guidelines
- Performance-first approach
- GPU-accelerated transforms
- Will-change property usage
- Reduced motion support
- No animation on mobile if performance impact
- Loading animations under 300ms
- Micro-interactions for delight

### Content Management
- Markdown support for blog
- Rich text editor for dynamic content
- Media library organization
- Version control for content
- Preview functionality
- SEO metadata per page

### Analytics & Tracking
- Google Analytics 4
- Conversion tracking
- Heat mapping
- A/B testing framework
- Error tracking (Sentry)
- Performance monitoring

---

> 💬 This comprehensive design system ensures Kleisli Labs presents a professional, trustworthy, and innovative web presence that appeals to early-stage AI startups while maintaining technical excellence and accessibility.