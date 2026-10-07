import Groq from 'groq-sdk'

export interface Msg { role: 'system' | 'user' | 'assistant'; content: string }

// Free chain: Groq (2 models) -> Gemini -> Cerebras. Returns '' when every provider fails; callers degrade gracefully.
export async function complete(messages: Msg[], maxTokens = 400, temperature = 0.6): Promise<string> {
  if (process.env.GROQ_API_KEY) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    for (const model of ['qwen/qwen3.8-27b', 'openai/gpt-oss-20b']) {
      try {
        const r = await groq.chat.completions.create({ model, messages, max_tokens: maxTokens, temperature })
        const c = r.choices[0]?.message?.content
        if (c) return c
      } catch (e) { console.warn(`[llm] groq/${model} failed`, e) }
    }
  }
  if (process.env.GEMINI_API_KEY) {
    try {
      const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
        body: JSON.stringify({
          contents: messages.filter(m => m.role !== 'system').map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          systemInstruction: { parts: [{ text: messages.find(m => m.role === 'system')?.content ?? '' }] },
          generationConfig: { maxOutputTokens: maxTokens, temperature },
        }),
      })
      if (r.ok) {
        const d = await r.json()
        const c = d.candidates?.[0]?.content?.parts?.[0]?.text
        if (c) return c
      }
    } catch (e) { console.warn('[llm] gemini failed', e) }
  }
  if (process.env.CEREBRAS_API_KEY) {
    try {
      const r = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CEREBRAS_API_KEY}` },
        body: JSON.stringify({ model: 'llama3.1-8b', messages, max_tokens: maxTokens, temperature }),
      })
      if (r.ok) {
        const d = await r.json()
        const c = d.choices?.[0]?.message?.content
        if (c) return c
      }
    } catch (e) { console.warn('[llm] cerebras failed', e) }
  }
  return ''
}
