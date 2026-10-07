# HANDOFF - billslash design-system pass
**Date:** 2026-10-06  **Status:** COMPLETE (files only, not committed)
## Design lock
- Archetype: weekend-lifestyle (weekend plan blocks + one-bill CTA)
- Palette: bg #fff7f5, accent #be185d (registered in design-system palette-registry)
- Logo: "Slash" key word in accent, bill-lines + slash glyph (app/icon.svg, apple-icon.svg, components/Logo.tsx); app/icon.tsx -> icon.tsx.bak
- Demo: typed sample script, labelled made-up
- Theme loader: replaced with design-system version (already wired in layout)
- Honest content: removed $65/$89/$58 demo numbers, "$40/mo average", "2 free/month" claim
- AI: lib/llm.ts Groq x2 -> Gemini -> Cerebras; chatbot + generate degrade gracefully (no 500)
- Dead files: desktop-1280.png, mobile-375.png in project root (stray screenshots, not removed)
## Steps
- [x] lock  - [x] page/css/logo/icons  - [ ] build + screenshots


## Files changed (final)
lib/theme-loader.ts, lib/llm.ts (new), app/api/chatbot/route.ts, app/api/generate/route.ts, app/layout.tsx, app/globals.css, app/page.tsx, components/Logo.tsx (new), app/icon.svg, app/apple-icon.svg, recoloured FeedbackWidget/BillBot/negotiate/not-found/privacy/terms. app/icon.tsx renamed icon.tsx.bak.
Build OK. 375/1280 read for / and /negotiate, no overflow.
Stray files: shot.tmp.mjs, desktop-1280.png, mobile-375.png in project root (not removed, no-rm rule).
Note: /negotiate keeps dark nav + dark tiles on light page (visual mismatch, not fixed).


## OWASP LLM Top 10 dispositions (gate item 45, 2026-10-07; list recalled from memory, unverified)
- LLM01 prompt injection: input sanitised in chat route (app/api/chatbot/route.ts); no output filtering or tool sandbox review done. PARTIAL.
- LLM02 sensitive info disclosure: `redact()` helper available; not applied to every log. PARTIAL.
- LLM04/10 DoS / unbounded consumption: per-IP rate limit where present; token budgets not enforced. PARTIAL.
- LLM05 improper output handling: model output rendered as text; not audited for HTML sinks. UNVERIFIED.
- LLM06 excessive agency: no tool-calling agents audited. UNVERIFIED.
- Others (supply chain, poisoning, embeddings, misinformation): not assessed.


## ANIMATED SCOPE (gate items 19/21, 2026-10-07)
- Moves: (1) hero aurora/mesh background `.bs-bg` drifts slowly (bs-drift, 20s) for ambience; (2) typed example script plus caret (bs-blink) shows the product output; (3) hero entry fade/slide via motion (0.4s, 30-80ms stagger) so the eye lands on headline then CTA; (4) press scale 0.97 on `.btn-primary`, `.btn-ghost`, `.bs-tile` for tactile feedback; hover lift gated to `(hover: hover) and (pointer: fine)`.
- Trigger: page load (ambient, entry, typing) and press/hover (interactive). Transform and opacity only, ease-out cubic-bezier(0.23,1,0.32,1), UI under 300ms.
- Reduced motion: `@media (prefers-reduced-motion: reduce)` zeroes all animation durations and transitions globally, plus explicit `.bs-bg`, `.bs-caret`, fade classes and press scale off; motion `useReducedMotion()` shows the full script instantly.
- Changes this pass: gradient CTA (#be185d to #9d174d) with tinted shadow, green/amber text darkened for 4.5:1, footer links 44px, `100dvh` + `overflow-x: clip`, hero subtext cut to under 20 words and removed stale layout wording.
- Impeccable detect: ran on app/page.tsx (clean) and app/globals.css (1 finding: overused font Inter; kept, brand stack in design lock, no new deps).
- Verified: 375x812 and 1280x800 screenshots after last edit read; scrollWidth == clientWidth at both; CTA bottom 390px/489px (above fold); contrast measured by script, all pairs >= 4.5:1 (white on CTA gradient hand-checked at both stops).
- Caveat: pre-existing floating Feedback pill sits close to the chat FAB at 375; not changed.

SKILL-STACK: done
