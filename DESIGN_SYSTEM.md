# IdeaLogue Design System

## Ultra-Aesthetic Minimalist Interface

### Color Palette

#### Background & Surfaces
- **Primary Background**: `#F9F9FB` - Soft, premium off-white
- **Glass Cards**: `rgba(255, 255, 255, 0.7)` with 12px backdrop blur
- **Borders**: `rgba(0, 0, 0, 0.05)` - Very subtle, elegant borders

#### Accent Colors (Used Sparingly)
- **Charcoal**: `#4A5568` - Primary accent for buttons and active states
- **Slate**: `#64748B` - Secondary accent
- **Sage**: `#8B9A8B` - Tertiary accent
- **Soft Variants**: 8-10% opacity backgrounds for tags and highlights

### Typography

#### Principles
- **Font Weight Hierarchy**: Semibold (600) for headings, regular (400) for body
- **Letter Spacing**: 
  - `-0.03em` for large headings (premium feel)
  - `0.1em` for uppercase labels (editorial spacing)
  - `0.005em` for body text (improved readability)
- **Line Height**: `1.7` for body text (breathing room)

#### Classes
- `.heading-premium` - Tight letter-spacing for headings
- `.text-premium` - Optimized line-height and spacing for body text
- `.uppercase-premium` - Wide-spaced uppercase labels

### Components

#### Glass Morphism Cards
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
}
```

#### Buttons
- **Primary (Accent)**: `.btn-accent` - Charcoal background with smooth hover lift
- **Minimal**: `.btn-minimal` - Subtle border with light hover state
- **All buttons**: Pill-shaped (9999px border-radius) for modern aesthetic

#### Inputs
- **Pill Input**: `.input-pill` - Rounded full with soft background
- **Focus State**: Subtle ring with 4px spread for accessibility

### Spacing & Layout

#### Padding Scale
- **Cards**: `p-8` to `p-12` (double standard spacing)
- **Sections**: `py-20` vertical padding for breathing room
- **Containers**: `px-8 sm:px-12 lg:px-16` responsive horizontal padding

#### Gaps
- **Grid**: `gap-8` (32px) between cards
- **Flex**: `gap-10` (40px) for navigation items

### Interactions

#### Transitions
- **Duration**: `0.4s ease` (slow, calm transitions)
- **Hover States**: Subtle transform and shadow changes
- **No Jarring Effects**: Everything feels fluid and intentional

### Navigation

- **Frosted Glass Header**: Semi-transparent with blur effect
- **Minimal Logo**: Single dot + wordmark
- **Text-Based Navigation**: No heavy colored buttons in nav
- **Exit Instead of Sign Out**: Cleaner, more sophisticated language

### Philosophy

**90% Monochrome** - Color is used extremely sparingly, only on:
- Upvote button when active
- Category tags (muted tones)
- Submit/CTA buttons

**Maximum Breathing Room** - White space is a feature, not wasted space

**Sophisticated Interactions** - Every hover, click, and transition feels intentional and premium

**Editorial Typography** - Letter-spacing and font weights create hierarchy without color
