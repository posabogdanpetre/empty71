const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ city: 'București' })
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Unde este cel mai apropiat magazin SportGuru?" returns stores', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ city: 'București' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
    })

    test('city is optional — returns all stores when omitted', async () => {
        const out = await handler({})
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/store/i)
    })

    test('unmatched city returns an empty store list, not an error', async () => {
        const out = await handler({ city: 'ZZZ-nonexistent-city' })
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
        expect(out.structuredContent.stores.length).toBe(0)
        expect(out.content[0].text).toMatch(/no .*stores? found/i)
    })
})
