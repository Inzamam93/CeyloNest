import { HOTEL, BUTLER } from '../data/config'

export async function askClaude(messages, guestPrefs = {}) {
  const prefContext = guestPrefs.occasion && guestPrefs.occasion !== 'none'
    ? `Guest is on a ${guestPrefs.occasion}.`
    : ''
  const accessContext = guestPrefs.accessMode && guestPrefs.accessMode !== 'standard'
    ? `Guest uses ${guestPrefs.accessMode} accessibility mode — keep responses especially clear and concise.`
    : ''

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
      system: `You are the AI concierge for ${HOTEL.name} in Galle, Sri Lanka, working alongside ${BUTLER.name} (personal butler).
Help guests with hotel services, local tips, and travel advice about Sri Lanka.
Keep replies warm, brief and helpful (2–4 sentences max). ${prefContext} ${accessContext}
Hotel WiFi password: "${HOTEL.wifiPass}". Check-out: 11am. Direct phone: ${HOTEL.phone}.
Know about: Galle Fort, Unawatuna/Mirissa beaches, whale watching (Mirissa), Ayurveda treatments,
tuk-tuks, Ceylon tea, hoppers, kottu roti, Temple of the Tooth (Kandy), Sigiriya, Ella train, Yala Safari.
For emergencies always direct guests to call ${HOTEL.phone}.`,
      messages,
    }),
  })

  if (!response.ok) throw new Error(`API error: ${response.status}`)
  const data = await response.json()
  return data.content?.find(b => b.type === 'text')?.text
    ?? "I'm having trouble right now. Please message your butler or call reception."
}
