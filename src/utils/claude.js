import { HOTEL } from '../data/config'

/**
 * Sends a conversation to the Anthropic API and returns the AI reply.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>}
 */
export async function askClaude(messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are CeyloNest AI Concierge for ${HOTEL.name}, a luxury boutique hotel in Galle, Sri Lanka.
You help guests with hotel services, local attractions, and travel tips about Sri Lanka.
Keep answers warm, concise, and helpful (2-4 sentences max).
Hotel details: WiFi password is "${HOTEL.wifiPass}", check-out is 11am, phone is ${HOTEL.phone}.
You know about: Galle Fort, beaches (Unawatuna, Mirissa, Tangalle), whale watching in Mirissa,
Ayurveda treatments, tuk-tuk culture, Ceylon tea, Sri Lankan cuisine (hoppers, kottu roti, lamprais,
string hoppers), Temple of the Tooth in Kandy, Sigiriya Rock, Yala National Park, Ella train ride.
For emergencies always direct guests to call reception at ${HOTEL.phone}.`,
      messages,
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content?.find((b) => b.type === 'text')?.text
    ?? 'I'm having trouble connecting. Please call reception for assistance.'
}
