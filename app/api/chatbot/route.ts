import { sanitizeUserInput } from '@/lib/guard'
import { reportToTaskFlow } from '@/lib/reportToTaskFlow'
import { NextRequest, NextResponse } from 'next/server'
import { complete } from '@/lib/llm'
import { AI_LIMITER } from '@/lib/rateLimit'

const SYSTEM_PROMPT = `You are BillBot, an expert bill negotiation assistant on BillSlash.

Help users with:
- Tips for negotiating bills (rent, phone, internet, insurance, subscriptions, credit cards, utilities)
- What to say to retention departments
- How to find competitor prices for leverage
- When's the best time to negotiate
- What to do if they say no

Keep answers concise (2-4 sentences max). Be practical and actionable.

If asked about something outside bill negotiation, respond:
"I'm BillBot, trained to help with bill negotiations. For that question, try Google or ChatGPT!"`

export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req); if (limited) return limited

  try {
    const { messages } = await req.json()
    for (const m of Array.isArray(messages) ? messages : []) if (m && typeof m.content === 'string') m.content = sanitizeUserInput(m.content).text

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-8),
    ]

    const content = await complete(chatMessages as Parameters<typeof complete>[0], 300)

    if (!content) {
      return NextResponse.json({ content: "Chat is resting — try again in a moment." })
    }

    void reportToTaskFlow({ project: 'billslash', agentName: 'ChatBot', status: 'completed', message: 'Chat message processed' })
    return NextResponse.json({ content })

  } catch (err) {
    console.error('chatbot error:', err)
    return NextResponse.json({ content: "Chat is resting — try again in a moment." })
  }
}
