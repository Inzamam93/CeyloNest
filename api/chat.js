// api/chat.js
// ─────────────────────────────────────────────────────────────────────────────
// Vercel Serverless Function — runs on the server, never in the browser.
//
// The Anthropic API key (ANTHROPIC_API_KEY) is read here from Vercel's
// environment variables. It is never included in the frontend JS bundle.
//
// The browser calls POST /api/chat with { messages, guestPrefs }.
// This function adds the system prompt, attaches the secret key, forwards
// the request to Anthropic, and returns only the reply text to the browser.
// ─────────────────────────────────────────────────────────────────────────────

const HOTEL = {
  name:    'Villa Serenity',
  wifiPass:'Ceylon2024*',
  phone:   '+94 91 222 4567',
}

const BUTLER = {
  name: 'Kavindu Perera',
}

function buildSystemPrompt(guestPrefs = {}) {
  const prefContext = guestPrefs.occasion && guestPrefs.occasion !== 'none'
    ? `Guest is on a ${guestPrefs.occasion}.`
    : ''

  const accessContext = guestPrefs.accessMode && guestPrefs.accessMode !== 'standard'
    ? `Guest uses ${guestPrefs.accessMode} accessibility mode — keep responses especially clear and concise.`
    : ''

  return `You are the AI concierge for ${HOTEL.name} in Sri Lanka, working alongside ${BUTLER.name} (personal butler).
Help guests with hotel services, local tips, and travel advice about Sri Lanka.
Keep replies warm, brief and helpful (2–4 sentences max). ${prefContext} ${accessContext}
Hotel WiFi password: "${HOTEL.wifiPass}". Check-out: 11am. Direct phone: ${HOTEL.phone}.
Know about: Galle Fort, Unawatuna/Mirissa beaches, whale watching, Ayurveda treatments,
tuk-tuks, Ceylon tea, hoppers, kottu roti, Temple of the Tooth (Kandy), Sigiriya, Ella train, Yala Safari.
For emergencies always direct guests to call ${HOTEL.phone}.`.trim()
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Validate API key exists on server
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY environment variable is not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  // Parse and validate request body
  const { messages, guestPrefs } = req.body ?? {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' })
  }

  // Validate each message has role + content
  const validRoles = new Set(['user', 'assistant'])
  for (const msg of messages) {
    if (!validRoles.has(msg.role) || typeof msg.content !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' })
    }
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-key':       apiKey,               // ← key only ever used here, server-side
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     buildSystemPrompt(guestPrefs),
        messages:   messages.map(({ role, content }) => ({ role, content })),
      }),
    })

    if (!anthropicRes.ok) {
      const errorBody = await anthropicRes.text()
      console.error('Anthropic API error:', anthropicRes.status, errorBody)
      return res.status(502).json({ error: 'Upstream API error' })
    }

    const data = await anthropicRes.json()
    const reply = data.content?.find((b) => b.type === 'text')?.text

    if (!reply) {
      return res.status(502).json({ error: 'No text content in response' })
    }

    return res.status(200).json({ reply })

  } catch (err) {
    console.error('Handler error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
