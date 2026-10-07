# DESIGN — BillSlash
Source of truth: `agents/design-system` (MASTER.md). This file is the project pointer.

- Accent: `#be185d` on bg `#fff7f5` (light, rose)
- Layout/palette/bg animation/GA4/flags: overridable by the hub via Edge Config `theme_billslash` (loaded by `lib/theme-loader.ts`, applied in `app/layout.tsx`); hub values win over the defaults here.
- Background: `components/AnimatedBg.tsx` (hub `layout.bgAnimation`, reduced-motion safe, default `none` = unchanged look).
- Logo: `components/Logo.tsx`; favicon is a static icon (no `app/icon.tsx`).

## AI platform (ai-core) status
Not on ai-core yet (honest gap): generation and chat use the local free chain (`lib/llm.ts`, Groq -> Gemini -> Cerebras). No document upload/RAG in the current scope; adopt ai-core if bill upload is added.
