const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ name: 'Under Armour Velociti Pace' });
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"Spune-mi mai multe despre pantofii Under Armour Velociti Pace" returns product details', async () => {
        const out = await handler({ name: 'Under Armour Velociti Pace' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.name).toMatch(/Velociti Pace/);
        expect(out.structuredContent.price).toBe('549 Lei');
        expect(out.structuredContent.category).toBe('Pantofi alergare');
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ name: 'Under Armour Velociti Pace' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('returns error message when required name is missing', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/name|provide/i);
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('unknown product returns a not-found message with empty structuredContent', async () => {
        const out = await handler({ name: 'Nonexistent Product 9000' });
        expect(out.content[0].text).toMatch(/no product found/i);
        expect(out.structuredContent).toEqual({});
    });

    test('exact-name match is returned flat', async () => {
        const out = await handler({ name: 'Bicicleta pliabila Dahon Curl i8 16"' });
        expect(out.structuredContent.price).toBe('7.415 Lei');
        expect(out.structuredContent.category).toBe('Biciclete');
    });
});
