// PLACEHOLDER — Action Planner returned no sample data for this tool.
// This is NOT real data. Replace with a real API call, or re-run
// Action Planner once it can source this tool's data.
// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Sample Store (no data from Action Planner)',
        address: 'N/A',
        phone: 'N/A',
        hours: 'N/A'
    }
]

module.exports = async ({ city = '' } = {}) => {
    const query = typeof city === 'string' ? city.trim() : ''

    const results = query
        ? MOCK_DATA.filter((store) => {
            const haystack = `${store.name} ${store.address}`.toLowerCase()
            return haystack.includes(query.toLowerCase())
        })
        : MOCK_DATA

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No SportGuru stores found near ${query}.` }],
            // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
            structuredContent: { stores: [] }
        }
    }

    const where = query ? ` near ${query}` : ''
    const summary = `Found ${results.length} SportGuru store${results.length === 1 ? '' : 's'}${where}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
        structuredContent: { stores: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?city=${city}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?city=${encodeURIComponent(city)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
