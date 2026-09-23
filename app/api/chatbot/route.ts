import { reportToTaskFlow } from '@/lib/reportToTaskFlow'
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { AI_LIMITER } from '@/lib/rateLimit'

let _groq: Groq | null = null
function getGroq() {
  if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
  return _groq
}

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

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-8),
    ]

    let content = ''
    try {
      const completion = await getGroq().chat.completions.create({
        model: 'qwen/qwen3.8-27b',
        messages: chatMessages,
        max_tokens: 300,
        temperature: 0.6,
      })
      content = completion.choices[0]?.message?.content || ''
    } catch (groqErr) {
      console.warn('chatbot groq failed, trying fallback model', groqErr)
      try {
        const completion = await getGroq().chat.completions.create({
          model: 'openai/gpt-oss-20b',
          messages: chatMessages,
          max_tokens: 300,
          temperature: 0.6,
        })
        content = completion.choices[0]?.message?.content || ''
      } catch (fallbackErr) {
        console.error('chatbot fallback also failed', fallbackErr)
      }
    }

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
