import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

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
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const completion = await getGroq().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-8),
      ],
      max_tokens: 300,
      temperature: 0.6,
    })

    const content = completion.choices[0]?.message?.content || ''
    return NextResponse.json({ content })

  } catch (err) {
    console.error('chatbot error:', err)
    return NextResponse.json({ error: 'Failed to respond' }, { status: 500 })
  }
}
