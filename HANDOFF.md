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
