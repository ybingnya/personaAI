## Vibe
- Editorial Magazine × Swiss Typography — oversized confident headlines, pastel color-block sections, strict monochrome grid, hairline rules, pill-only CTAs

## Color
- Primary: #000000
- On Primary: #ffffff
- Accent: #ff3d8b
- On Accent: #ffffff
- Background: #ffffff
- Foreground: #000000
- Muted: #f7f7f5
- Border: #e6e6e6

## Typography
- Heading: Inter (family: 'Inter', sans-serif, weight: 700)
- Body: Inter (family: 'Inter', sans-serif, weight: 400)

## Visual Language
- Core visual signature: Oversized pastel color-block sections anchored to the viewport — a single large pastel fill per scroll zone, white canvas between them, hairline 1px rules as the only structural dividers
- Material & depth: Minimal shadows; 1px hairline borders for cards and inputs; no elevation other than small floating dropdowns
- Containers & buttons: Pill-shaped primary (black fill, white text) and secondary (white fill, black border+text) CTAs; circular icon buttons; cards with 24px radius and hairline borders on white or surface-soft backgrounds; inputs with 8px radius, 1px hairline border, 12px/14px padding
- Layout rhythm: White hero/page header → pastel color-block summary → white card/table content; mono uppercase eyebrow labels (letter-spacing 0.54px) for taxonomy; weight and size for hierarchy, not opacity

## Animation
- Entrance: page sections fade-in 300ms ease-out on mount
- Interaction: button press scale 0.97, 120ms ease
- Scroll / transition: page transitions fade 200ms

## Forbidden
- Glassmorphism, frosted glass, or heavy drop shadows
- Mid-gray text for hierarchy (use weight and size instead)
- Square CTA buttons

## Additional Notes
- No dark mode; white canvas only
- Mono font (JetBrains Mono or Geist Mono) used exclusively for uppercase eyebrow labels and captions
- Pastel blocks: block-lime #dceeb1, block-lilac #c5b0f4, block-cream #f4ecd6, block-pink #efd4d4, block-mint #c8e6cd, block-coral #f3c9b6, block-navy #1f1d3d
- Status semantic: READY/success uses #1ea64a as small text/glyph only; FAILED uses #ff3d8b sparingly
