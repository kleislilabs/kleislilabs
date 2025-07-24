# Kleisli Labs Website Revamp - Focused Execution Plan

> 🎯 Laser-focused plan to update theme and align content with Kleisli Labs' AI consulting positioning



### 1.1 Color System Update

**Files to Update**:
- `src/app/globals.css`
- `tailwind.config.ts`

**Tasks**:
- [ ] Replace grayscale oklch colors with brand colors:
  ```css
  --primary: #102A43;        /* Navy Blue */
  --accent: #FF6F61;         /* Flame Orange */  
  --highlight: #0EDDAA;      /* Teal */
  --background: #F7FAFC;     /* Light Gray */
  --foreground: #1C1C1E;     /* Dark Gray Text */
  ```
- [ ] Update all color variables to use new palette
- [ ] Configure Tailwind with custom color tokens
- [ ] Test color contrast for accessibility (4.5:1 minimum)

### 1.2 Typography Setup

**Tasks**:
- [ ] Import Inter font from Google Fonts
- [ ] Update font stack in globals.css and tailwind.config.ts
- [ ] Configure font sizes using modular scale:
  - H1: 48px (Hero only)
  - H2: 36px (Section titles)
  - H3: 28px (Subsections)
  - Body: 16px
- [ ] Set proper line heights and font weights

### 1.3 Update Core Components

**Files to Update**:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`

**Tasks**:
- [ ] Update Button styles:
  - Primary: Orange background (#FF6F61), white text
  - Secondary: Navy outline (#102A43)
  - Border radius: 8px
  - Min height: 44px (mobile touch target)
- [ ] Update Card component with new border colors and shadows
- [ ] Add hover states with smooth transitions (200ms)

---


### 2.1 Navigation Update

**New Component**:
- `src/components/layout/StickyHeader.tsx`
- `src/components/layout/MobileMenu.tsx`

**Tasks**:
- [ ] Create StickyHeader with:
  - Logo left, navigation center, "Get AI Audit" CTA right
  - Add "Services" to navigation (Home, Services, About, Blog, Contact)
  - Sticky behavior after scroll
  - Background transition on scroll
- [ ] Build MobileMenu with:
  - Hamburger toggle button
  - Full-screen overlay
  - Smooth slide animation (250ms)

### 2.2 Homepage Content Update

**File**: `src/app/page.tsx`

**Essential Sections from DESIGN-BLUEPRINT.md**:
1. **HeroBanner**: Update with new tagline and USP
2. **ServicesGrid**: Display 5 core services
3. **ContactSection**: Simple contact form (no audit form)

**Tasks**:
- [ ] Update Hero section:
  - H1: "Igniting Early-Stage AI Ventures" (from SERVICES.md)
  - Subtitle: "From concept to Series A: Technical firepower for ambitious AI founders"
  - Two CTAs: "Get Started" and "View Services"
- [ ] Create ServicesGrid showing:
  - AI QuickStart
  - Prompt Foundry
  - Data Engine
  - Model Clinic
  - Investor Pack
- [ ] Update existing blog section styling with new colors
- [ ] Add simple contact section with basic form

### 2.3 Create Service Components

**New Components**:
- `src/components/sections/ServicesGrid.tsx`
- `src/components/ui/ServiceCard.tsx`

**Tasks**:
- [ ] Build ServiceCard with:
  - Icon placeholder (48px)
  - Service name (H3)
  - Brief description
  - Teal accent for icons
  - White background with subtle shadow
- [ ] Create responsive grid (3 columns desktop, 1 mobile)

---


### 3.1 Mobile Responsiveness

**Tasks**:
- [ ] Implement hamburger menu for mobile navigation
- [ ] Ensure all touch targets are 44px minimum
- [ ] Stack service cards vertically on mobile
- [ ] Test on common mobile viewports (360px, 390px, 414px)
- [ ] Optimize font sizes for mobile readability

### 3.2 Final Theme Polish

**Tasks**:
- [ ] Add subtle animations:
  - Fade-up on scroll for sections (300ms)
  - Hover effects on cards and buttons
  - Smooth scroll for anchor links
- [ ] Ensure consistent spacing using 8px grid
- [ ] Verify all text uses new Inter font
- [ ] Add focus states for accessibility

### 3.3 Content Review

**Tasks**:
- [ ] Update all page titles and descriptions
- [ ] Ensure tagline consistency across pages
- [ ] Remove any blog-centric messaging
- [ ] Add Services page link to navigation
- [ ] Update footer with service categories

---

## ✅ Success Criteria

### Visual Updates
- [ ] Navy/Orange/Teal color scheme fully implemented
- [ ] Inter font applied throughout
- [ ] All buttons and cards use new styles
- [ ] Mobile hamburger menu functional

### Content Alignment
- [ ] Homepage shows "Igniting Early-Stage AI Ventures" tagline
- [ ] 5 core services displayed prominently
- [ ] Navigation includes Services section
- [ ] Contact form present (basic version)

### Mobile Experience
- [ ] Site fully responsive at 360px+
- [ ] Touch targets meet 44px minimum
- [ ] Navigation works smoothly on mobile
- [ ] Text remains readable on small screens

---

## 🚀 Implementation Order

 Update color system in globals.css
 Implement Inter font and typography
 Update button and card components
 Build StickyHeader and MobileMenu
 Update homepage content and hero
 Create ServicesGrid and ServiceCards
 Mobile testing and final polish

---
