import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

let _groq: Groq | null = null
function getGroq() {
  if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
  return _groq
}

const PLAYBOOKS: Record<string, string> = {
  rent: `You are an expert tenant negotiator. Focus on:
- Tenant's track record (on-time payments, property care, length of tenure)
- Market comparables in the area
- Cost of tenant turnover for landlord (vacancy loss, repairs, finding new tenant)
- Timing leverage (renewal vs new tenant search)
Script should be professional, appreciative of the relationship, and firm about the ask.`,

  phone: `You are an expert telecom negotiator. Focus on:
- Loyalty value and payment history
- Specific competitor promotions (mention realistic competing offers)
- Retention team tactics — ask to be transferred to retention if front-line says no
- Bundling or plan downgrades as alternatives to cancellation
Scripts should reference that they're considering switching providers.`,

  internet: `You are an expert internet/cable negotiator. Focus on:
- Promotional rates that expired vs current market rates
- ISP competitor pricing in the area
- Ask for "new customer" rate or loyalty discount
- Threaten cancellation only if willing to follow through
Scripts should be direct, cite specific numbers.`,

  insurance: `You are an expert insurance negotiation advisor. Focus on:
- Bundling home + auto for discounts
- Annual payment vs monthly (saves 5-10%)
- Shopping competing quotes (mention you've received lower quotes)
- Loyalty discounts and claims-free discounts
- Increasing deductible in exchange for lower premium
Scripts should emphasize long relationship and clean claims history.`,

  subscriptions: `You are an expert subscription negotiation advisor. Focus on:
- Cancellation as a trigger for retention offers
- Seasonal/loyalty discounts often available but unpublicized
- Downgrade threat as leverage
- Annual plan options
Scripts should be short, direct, and willing to cancel if needed.`,

  utilities: `You are an expert utility bill advisor. Focus on:
- Budget billing / equal-pay plans
- Low-income assistance programs if applicable
- Energy audit programs that reduce bills
- Payment plan negotiations
Note: utility companies have less flexibility but payment plans and efficiency programs exist.`,

  'credit-cards': `You are an expert credit card negotiation advisor. Focus on:
- APR reduction requests (cite long tenure, on-time payments, good credit score)
- Annual fee waiver for loyal customers
- Late fee one-time removal
- Credit limit increase without hard pull
Scripts should emphasize credit score, payment history, and competing card offers.`,

  'car-payments': `You are an expert auto finance negotiation advisor. Focus on:
- Refinancing at lower rates with better credit or market rate drops
- Dealer loyalty programs for lease renewals
- GAP insurance removal if equity has built
- Extended warranty cancellation for refund
Scripts should reference current market rates and competing lender offers.`,
}

export async function POST(req: NextRequest) {
  try {
    const { billType, provider, currentAmount, yearsCustomer, reason, scriptType } = await req.json()

    if (!billType || !provider || !currentAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const playbook = PLAYBOOKS[billType] || PLAYBOOKS['subscriptions']
    const format = scriptType === 'phone' ? 'phone call script with opening, key talking points, and a closing ask' : 'professional email with subject line, body, and signature placeholder'

    const prompt = `${playbook}

Write a ${format} to negotiate a lower rate.

SITUATION:
- Provider: ${provider}
- Current monthly cost: $${currentAmount}/mo
- Years as customer: ${yearsCustomer} years
${reason ? `- Leverage/context: ${reason}` : ''}

Write the complete, ready-to-send script. Be specific to ${provider}. Include realistic numbers where possible. Do NOT include any preamble or explanation — just the script itself.`

    const completion = await getGroq().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
    })

    const script = completion.choices[0]?.message?.content || ''
    return NextResponse.json({ script })

  } catch (err) {
    console.error('generate error:', err)
    return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 })
  }
}
