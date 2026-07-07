// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Pantofi alergare trail barbati NNormal Cadí FW 2026',
        description: "Men's trail running shoes for rugged terrain.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/n/s/ns4cd1m-0016_1.jpg?width=304&height=219&store=default&image-type=small_image',
        price: '795 Lei',
        category: 'Pantofi alergare',
    },
    {
        name: 'Pantofi alergare dama Under Armour Halo Runner',
        description: "Women's road running shoes.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/6/0/6013165-001_default_1_1.jpg?width=304&height=219&store=default&image-type=small_image',
        price: '649 Lei',
        category: 'Pantofi alergare',
    },
    {
        name: 'Pantofi alergare barbati Under Armour Velociti Pace',
        description: "Men's road running shoes.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/6/0/6009107-703_default_1_1.jpg?width=304&height=219&store=default&image-type=small_image',
        price: '549 Lei',
        category: 'Pantofi alergare',
    },
    {
        name: 'Pantofi alergare trail barbati Hoka Challenger 8 Wide SS 2026',
        description: "Men's wide-fit trail running shoes.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/6/0/6007639-001_default_1_1.jpg?width=304&height=219&store=default&image-type=small_image',
        price: '750 Lei',
        category: 'Pantofi alergare',
    },
    {
        name: 'Bicicleta Cube Nature One Trapeze 28" 2026',
        description: 'Cube trekking bicycle with 28-inch wheels.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/b/i/bicicleta-cube-nature-one-trapeze-amarone-lunar-2025-46-cm_350481_1_1770961064_1_1.jpg?width=304&height=219&store=default&image-type=small_image',
        price: '3.399 Lei',
        category: 'Biciclete',
    },
    {
        name: 'Bicicleta electrica MTB Amflow PR Carbon Pro 29"/27.5" 2026',
        description: 'Carbon frame electric mountain bike.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/b/i/bicicleta-electrica-amflow-pr-carbon-pro-basalt-grey-l_373509_1_1777518142_1_1.jpg?width=304&height=219&store=default&image-type=small_image',
        price: '31.590 Lei',
        category: 'Biciclete',
    },
    {
        name: 'Bicicleta pliabila Dahon Curl i8 16"',
        description: 'Compact 16-inch folding bicycle.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/_/d/_dsc1104_1.jpg?width=304&height=219&store=default&image-type=small_image',
        price: '7.415 Lei',
        category: 'Biciclete',
    },
];

module.exports = async ({ name = '' }) => {
    if (!name || typeof name !== 'string' || !name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product name to retrieve details for.' }],
            structuredContent: {},
        };
    }

    const query = name.trim().toLowerCase();
    const item = MOCK_DATA.find((p) => p.name.toLowerCase() === query)
        || MOCK_DATA.find((p) => p.name.toLowerCase().includes(query));

    if (!item) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${name}` }],
            structuredContent: {},
        };
    }

    return {
        content: [{
            type: 'text',
            text: `${item.name} — ${item.description} Price: ${item.price}. Category: ${item.category}.`,
        }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: { ...item },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}
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
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
