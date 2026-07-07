const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Arata-mi pantofi de alergare de la SportGuru" returns products', async () => {
        const out = await handler({ category: 'Pantofi alergare' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('no args returns the full catalog', async () => {
        const out = await handler({})
        expect(out.structuredContent.products.length).toBe(7)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Biciclete' })
        const { products } = out.structuredContent
        expect(products.length).toBeGreaterThan(0)
        expect(products.every((p) => p.category === 'Biciclete')).toBe(true)
    })

    test('filters by free-text query on product name', async () => {
        const out = await handler({ query: 'Hoka' })
        const { products } = out.structuredContent
        expect(products.length).toBe(1)
        expect(products[0].name).toMatch(/Hoka/)
    })

    test('returns empty products and a no-match message when nothing matches', async () => {
        const out = await handler({ query: 'nonexistent-zzz' })
        expect(out.content[0].text).toMatch(/no products found/i)
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
        expect(out.structuredContent.products.length).toBe(0)
    })
})
