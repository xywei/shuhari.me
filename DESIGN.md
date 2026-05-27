---
name: shuhari.me
description: Personal homepage and technical blog for Jacob Xiaoyu Wei.
colors:
  ash-paper: "oklch(0.974 0.011 88)"
  ink-blue-black: "oklch(0.19 0.035 255)"
  card-paper: "oklch(0.992 0.006 88)"
  ruled-border: "oklch(0.84 0.022 255)"
  pale-blue-gray: "oklch(0.92 0.018 255)"
  muted-ink: "oklch(0.43 0.035 255)"
  annotation-amber: "oklch(0.74 0.13 75)"
  night-paper: "oklch(0.15 0.025 255)"
  night-card: "oklch(0.18 0.027 255)"
  night-ink: "oklch(0.96 0.01 255)"
  night-border: "oklch(0.29 0.03 255)"
typography:
  display:
    fontFamily: "Commissioner Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 9.5vw, 4rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Commissioner Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Commissioner Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Commissioner Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "56px"
components:
  button-primary:
    backgroundColor: "{colors.ink-blue-black}"
    textColor: "{colors.ash-paper}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.pale-blue-gray}"
    textColor: "{colors.ink-blue-black}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  badge-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-blue-black}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  card-default:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.ink-blue-black}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: shuhari.me

## 1. Overview

**Creative North Star: "The Workbench Ledger"**

This visual system should feel like a carefully kept workbench log: precise, useful, compact, and quietly personal. It is a brand surface, but it should not behave like a campaign page. The design gives proof room to breathe: projects, publications, posts, and contact links should be inspectable without theatrical framing.

The current system uses ash-paper neutrals, ink-like foregrounds, tight typographic hierarchy, ruled separators, and small tactile surfaces. It should preserve the user's PRODUCT.md language: precise builder first, quiet scholar second, eccentric technical only where earned.

It explicitly rejects SaaS polish, academic CV dump density, designer portfolio theatrics, and terminal cosplay. If a future change makes the page look like a startup landing page, a PDF CV, a design-agency case study, or a fake shell prompt, it is off-brand.

**Key Characteristics:**
- Compact public identity with enough rhythm for scanning.
- Long-form and math-heavy reading comfort over decoration.
- Tactile, quiet components: bordered, useful, minimally lifted.
- Personal details are small, specific, and intentional.
- Durable surfaces that age like reference material.

## 2. Colors

The palette is ash paper and ink: warm paper, sober blue-black text, quiet blue-gray rules, and amber used as a rare annotation.

### Primary
- **Ink Blue-Black**: Primary foreground, primary button fill, link color in light mode, and the main authority color.

### Secondary
- **Pale Blue-Gray**: Active navigation, secondary button fill, muted chips, and low-emphasis surface states.

### Tertiary
- **Annotation Amber**: Selection color and rare emphasis. It is a marginal note, not a brand wash.

### Neutral
- **Ash Paper**: Main light background. Warm enough to avoid sterile white.
- **Card Paper**: Card and code surface background. Use sparingly so cards do not become the default answer.
- **Ruled Border**: Dividers, card borders, and structural lines.
- **Muted Ink**: Secondary descriptions and metadata.
- **Night Paper**: Dark-mode canvas for low-light reading.
- **Night Card**: Dark-mode cards, code blocks, and math display surfaces.
- **Night Ink**: Dark-mode foreground.
- **Night Border**: Dark-mode rules and card outlines.

### Named Rules
**The Annotation Rule.** Amber is for rare annotations, selections, and signals. It must not flood the page.

**The Ink Rule.** Links and primary actions should feel like ink, not neon. Avoid saturated blues that read as generic web chrome.

## 3. Typography

**Display Font:** Commissioner Variable, ui-sans-serif, system-ui, sans-serif  
**Body Font:** Commissioner Variable, ui-sans-serif, system-ui, sans-serif  
**Label/Mono Font:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace

**Character:** The type is single-family, compact, and controlled. Commissioner gives the page a sharper workbench-instrument voice without slipping into monospace costume. It relies on scale, weight, spacing, and tight letterfit rather than ornament.

### Hierarchy
- **Display** (700, `clamp(2rem, 9.5vw, 4rem)`, 0.95): Hero name only. It stays on one line.
- **Headline** (700, `clamp(2.25rem, 5vw, 3rem)`, 1.05): Page titles and major standalone headings.
- **Title** (600, `1.5rem`, 1.12): Section headings and article subheads.
- **Body** (400, `1rem`, 1.75): Long-form text, post bodies, project summaries. Cap readable article width at roughly 65 to 70 characters.
- **Label** (400, `0.875rem`, 1.25): Dates, year labels, compact metadata, and code-adjacent labels.

### Named Rules
**The No Costume Mono Rule.** Monospace is for dates, code, and metadata. Do not use it as a blanket technical costume.

**The No Discretionary Ligature Rule.** Keep discretionary ligatures off. Letterforms must stay legible and unornamented.

## 4. Elevation

The system is flat by default and uses tonal layering before shadow. Cards and ledger rows have a very small ink-tinted shadow, but depth mainly comes from borders, surface color, and spacing. The header may use translucent background and blur as a functional sticky treatment, not as decorative glass.

### Shadow Vocabulary
- **Card Low** (`0 1px 2px oklch(0.19 0.035 255 / 0.08)`): Default surface shadow. It should barely register.

### Named Rules
**The Flat Ledger Rule.** Surfaces rest flat. If depth is needed, use border and tonal contrast first, shadow second.

## 5. Components

Components should feel tactile and quiet: useful, bordered, and direct. Ledger rows are preferred over repeated cards when the content is primarily a list.

### Buttons
- **Shape:** Gently curved rectangle (10px radius).
- **Primary:** Ink fill with ash-paper text, compact height (40px), medium weight.
- **Hover / Focus:** Hover is a slight tonal change. Focus uses a 2px ring in the primary color.
- **Secondary / Ghost / Link:** Secondary uses pale blue-gray. Ghost appears only on interaction. Link buttons are text-first and underlined on hover.

### Chips
- **Style:** Rounded full pill, small type, border or muted fill depending on variant.
- **State:** Use outline chips for tags and current-context labels. Filled chips are reserved for current status or selected state.

### Cards / Containers
- **Corner Style:** Rounded-xl (12px radius).
- **Background:** Card Paper in light mode, Night Card in dark mode.
- **Shadow Strategy:** Card Low only. Avoid stacked or nested cards.
- **Border:** Always use a quiet full border. Never use a colored side stripe.
- **Internal Padding:** 24px on cards, tighter only for compact metadata.

### Ledger Rows
- **Style:** One bordered container with divided rows, not a grid of identical cards.
- **Use:** Contact links, project lists, and other compact reference material.
- **Interaction:** The whole row may be a link when the destination is unambiguous. Hover uses a muted tonal wash.

### Inputs / Fields
- **Style:** No dedicated input system exists yet. Future fields should use the same 10px radius, border token, and background token.
- **Focus:** Use the primary ring. Do not add glow.
- **Error / Disabled:** Disabled controls should lower opacity only when the affordance remains clear.

### Navigation
- **Style, typography, default/hover/active states, mobile treatment.** Sticky top navigation with compact 14px links, rounded active state, muted default color, and pale blue-gray active background. Keep it short and textual.

### Article Body
Article pages use a centered 3xl measure, generous 1.75 line height, ruled h2 separators, bordered code blocks, and scroll-safe math displays. This is the strongest product-like part of the brand system and should not be sacrificed for visual novelty.

## 6. Do's and Don'ts

### Do:
- **Do** lead with proof: publications, projects, posts, and contact links should remain inspectable.
- **Do** use ash-paper neutrals, ink foregrounds, and amber as a rare annotation.
- **Do** use ledger rows for compact repeated material before reaching for cards.
- **Do** preserve math readability with wide enough measure, scroll-safe equations, and stable code blocks.
- **Do** respect reduced motion. State changes should be subtle and nonessential.

### Don't:
- **Don't** use SaaS polish: cream gradients, soft metric cards, startup section templates, or AI landing page sameness.
- **Don't** create an academic CV dump: dense lists without hierarchy, rhythm, or point of view are prohibited.
- **Don't** use designer portfolio theatrics: the work should not compete with decorative case-study styling.
- **Don't** use terminal cosplay: fake prompts, all-mono pages, and hacker costume styling are forbidden.
- **Don't** use gradient text, side-stripe accent borders, decorative glassmorphism, or the hero-metric template.
