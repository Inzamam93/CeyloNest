// src/utils/claude.js
// ─────────────────────────────────────────────────────────────────────────────
// Browser-side API helper.
//
// BEFORE: Called https://api.anthropic.com directly, exposing the API key
//         in the browser bundle via import.meta.env.VITE_ANTHROPIC_API_KEY.
//
// AFTER:  Calls our own Vercel serverless function at /api/chat.
//         No API key exists in the frontend at all — the key lives exclusively
//         in Vercel's server environment variables (ANTHROPIC_API_KEY).
// ─────────────────────────────────────────────────────────────────────────────

import { HOTEL } from '../data/config'

/**
 * Sends a conversation to the /api/chat proxy and returns the assistant reply.
 *
 * @param {Array<{role: 'user'|'assistant', content: string}>} messages
 * @param {object} guestPrefs  - occasion, accessMode, etc. from ProfileView
 * @returns {Promise<string>}
 */
export async function askClaude(messages, guestPrefs = {}) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Note: NO API key here. The proxy adds it server-side.
    body: JSON.stringify({ messages, guestPrefs }),
  })

  if (!response.ok) {
    throw new Error(`Proxy error: ${response.status}`)
  }

  const { reply } = await response.json()

  return reply
    ?? "I'm having trouble right now. Please message your butler or call reception at ${HOTEL.phone}."
}
