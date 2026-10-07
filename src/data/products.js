export const categories = [
  { id: 'all', name: 'All Curations', count: 12, subtitle: 'Haute Floral Artistry' },
  { id: 'roses', name: 'Imperial Roses', count: 4, subtitle: 'Garden & Ecuadorian Stems' },
  { id: 'peonies', name: 'Silk Peonies', count: 3, subtitle: 'Dutch Fluff & Velvet Petals' },
  { id: 'orchids', name: 'Exotic Orchids', count: 2, subtitle: 'Cascading Phalaenopsis' },
  { id: 'wildflowers', name: 'Meadow Couture', count: 3, subtitle: 'Hand-foraged Botanicals' },
  { id: 'seasonal', name: 'Autumn Solstice', count: 2, subtitle: 'Limited Harvest Selection' }
];

export const products = [
  {
    id: 'f-01',
    name: 'Sultry Velvet Rose & Noir Ruscus',
    category: 'roses',
    price: 145,
    originalPrice: 175,
    rating: 4.95,
    reviewsCount: 48,
    isBestSeller: true,
    isLimited: false,
    badge: 'Signature',
    description: 'An alluring masterpiece composed of velvety scarlet garden roses, dark preserved Italian ruscus, and deep burgundy calla lilies, wrapped in matte silk parchment.',
    flowerComposition: ['Grand Prix Roses', 'Dark Italian Ruscus', 'Burgundy Calla Lilies', 'Black Baccara Accent'],
    dimensions: '65cm H x 50cm W',
    careTips: 'Trim stems at 45° angle every 2 days. Keep in cool water away from direct sunlight.',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-02',
    name: 'Champagne Peony & Sweet Pea Reverie',
    category: 'peonies',
    price: 185,
    originalPrice: 210,
    rating: 5.0,
    reviewsCount: 62,
    isBestSeller: true,
    isLimited: true,
    badge: 'Limited Harvest',
    description: 'Lush coral and pearl peonies paired with delicate fragrant sweet peas, French ranunculus, and silvery eucalyptus foliage.',
    flowerComposition: ['Dutch Coral Charm Peonies', 'White Ranunculus', 'Trailing Sweet Peas', 'Silver Dollar Eucalyptus'],
    dimensions: '60cm H x 48cm W',
    careTips: 'Peonies bloom best in room temperature water initially, then transfer to a refrigerated sanctuary overnight.',
    images: [
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-03',
    name: 'Palais Royal White Ranunculus & Garden Rose',
    category: 'roses',
    price: 160,
    originalPrice: 160,
    rating: 4.9,
    reviewsCount: 37,
    isBestSeller: false,
    isLimited: false,
    badge: 'Classic Haute',
    description: 'Monochromatic Parisian opulence featuring ivory garden roses, ruffled ranunculus, sweet alyssum, and frosted olive branches.',
    flowerComposition: ['O’Hara Garden Roses', 'White Butterfly Ranunculus', 'Olive Branch Sprigs', 'Astrantia'],
    dimensions: '58cm H x 45cm W',
    careTips: 'Mist petals lightly and replenish floral food solution every morning.',
    images: [
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-04',
    name: 'Kyoto Cascading Phalaenopsis Orchid',
    category: 'orchids',
    price: 240,
    originalPrice: 280,
    rating: 4.98,
    reviewsCount: 29,
    isBestSeller: true,
    isLimited: true,
    badge: 'Artisan Bespoke',
    description: 'Rare cascading white Phalaenopsis orchids set with minimalist Japanese zen branches, Spanish moss, and handmade ceramic pedestal presentation.',
    flowerComposition: ['Imperial White Phalaenopsis Orchids', 'Mitsuwa Branches', 'Preserved Mountain Moss', 'Bamboo Fiber Ribbon'],
    dimensions: '75cm H x 40cm W',
    careTips: 'Water with 3 ice cubes per week or soak orchid roots every 10 days for longevity lasting over 6 weeks.',
    images: [
      'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-05',
    name: 'Provence Lavender & Wild Meadow Harmony',
    category: 'wildflowers',
    price: 110,
    originalPrice: 130,
    rating: 4.88,
    reviewsCount: 51,
    isBestSeller: false,
    isLimited: false,
    badge: 'Botanical',
    description: 'Carefully curated seasonal French wildflowers, fragrant dried English lavender, chamomile daisies, and delicate field grasses.',
    flowerComposition: ['Blue Delphiniums', 'French Lavender', 'Chamomile Florets', 'Golden Feather Grass'],
    dimensions: '55cm H x 42cm W',
    careTips: 'Can be naturally air-dried after 10 days to preserve as an enduring dried floral heirloom.',
    images: [
      'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-06',
    name: 'Golden Hour Dahlia & Sunlit Marigold',
    category: 'seasonal',
    price: 130,
    originalPrice: 155,
    rating: 4.92,
    reviewsCount: 34,
    isBestSeller: false,
    isLimited: true,
    badge: 'Autumn Bloom',
    description: 'Warm sunset hues captured in dinnerplate café-au-lait dahlias, Tuscan sunflowers, burnt orange spray roses, and seeded eucalyptus.',
    flowerComposition: ['Café-au-Lait Dahlias', 'Tuscan Miniature Sunflowers', 'Terracotta Spray Roses', 'Seeded Foliage'],
    dimensions: '60cm H x 50cm W',
    careTips: 'Keep away from direct heat sources and draft vents to maintain vibrant color depth.',
    images: [
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-07',
    name: 'Blush Ranunculus & French Eustoma',
    category: 'peonies',
    price: 155,
    originalPrice: 180,
    rating: 4.94,
    reviewsCount: 43,
    isBestSeller: false,
    isLimited: false,
    badge: 'Poetic',
    description: 'Soft pastel whispers of powdery pink ranunculus, frilled eustoma petals, and silvery dusty miller leaves in custom linen wrap.',
    flowerComposition: ['Powder Pink Ranunculus', 'Frilled Lisianthus', 'Dusty Miller Foliage', 'Gardenia Accents'],
    dimensions: '58cm H x 46cm W',
    careTips: 'Trim stems under running lukewarm water before putting into a freshly washed crystal vase.',
    images: [
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-08',
    name: 'Céleste Blue Hydrangea & Cascading Jasmine',
    category: 'wildflowers',
    price: 165,
    originalPrice: 195,
    rating: 4.89,
    reviewsCount: 38,
    isBestSeller: true,
    isLimited: false,
    badge: 'Ceremony Choice',
    description: 'Immense cloud-like sky blue Dutch hydrangeas crowned with sweet trailing white star jasmine vines and frosted mint leaves.',
    flowerComposition: ['Dutch Sky Hydrangea', 'Trailing Jasmine Vine', 'White Astilbe', 'Spearmint Botanical'],
    dimensions: '62cm H x 52cm W',
    careTips: 'Hydrangeas love water! Submerge entire heads in cold water for 15 minutes if they ever wilt slightly.',
    images: [
      'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-09',
    name: 'Imperial Emerald Calla Lily Architecture',
    category: 'orchids',
    price: 210,
    originalPrice: 210,
    rating: 4.97,
    reviewsCount: 22,
    isBestSeller: false,
    isLimited: true,
    badge: 'Sculptural',
    description: 'Striking architectural arrangement of pure white calla lilies, tropical monstera leaves, and architectural horsetail equisetum.',
    flowerComposition: ['Calla Lilies', 'Tropical Monstera', 'Architectural Equisetum', 'White Dendrobium'],
    dimensions: '70cm H x 38cm W',
    careTips: 'Requires minimal water in vase (only 5-8 cm) to avoid stem softening.',
    images: [
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-10',
    name: 'Monet Giverny Water Lily & Meadow Whisper',
    category: 'wildflowers',
    price: 135,
    originalPrice: 150,
    rating: 4.91,
    reviewsCount: 40,
    isBestSeller: false,
    isLimited: false,
    badge: 'Impressionist',
    description: 'An impressionist painting brought to botanical reality with delicate larkspur, cornflowers, white cosmos, and soft maidenhair fern.',
    flowerComposition: ['Indigo Larkspur', 'Cornflowers', 'White Cosmos', 'Maidenhair Fern'],
    dimensions: '56cm H x 44cm W',
    careTips: 'Display in a softly diffused sunlit room for peak petal longevity.',
    images: [
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-11',
    name: 'Ecuadorian Heritage Black Baccara Rose',
    category: 'roses',
    price: 195,
    originalPrice: 230,
    rating: 5.0,
    reviewsCount: 74,
    isBestSeller: true,
    isLimited: true,
    badge: 'Grand Reserve',
    description: 'Cultivated in high volcanic soil in Ecuador, these deeply pigmented Black Baccara roses possess petals with the texture of real heavy velvet.',
    flowerComposition: ['Ecuadorian Black Baccara Roses', 'Golden-tipped Magnolia Leaves', 'Charcoal Preserved Statice'],
    dimensions: '65cm H x 45cm W',
    careTips: 'Store in cool ambient conditions. These long-stem varieties boast a vase life up to 14 days.',
    images: [
      'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'f-12',
    name: 'Versailles Autumn Gilded Amaryllis',
    category: 'seasonal',
    price: 170,
    originalPrice: 200,
    rating: 4.93,
    reviewsCount: 31,
    isBestSeller: false,
    isLimited: true,
    badge: 'Seasonal Solstice',
    description: 'Majestic crimson amaryllis paired with gilded autumn beech foliage, dark privet berries, and fragrant cinnamon pine cones.',
    flowerComposition: ['Royal Red Amaryllis', 'Gold Dipped Beech Leaves', 'Privet Berries', 'Cedar Branches'],
    dimensions: '68cm H x 48cm W',
    careTips: 'Support heavy amaryllis stems with our provided floral bamboo pin as the massive blooms open.',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85'
    ]
  }
];

export const clientReviews = [
  {
    id: 'r-01',
    author: 'Lady Genevieve Vance',
    location: 'Upper East Side, New York',
    quote: 'Maison Fleur turned our private anniversary dinner into an ethereal botanical museum. The velvet scent of the Ecuadorian roses is entirely unmatched.',
    rating: 5,
    verified: true,
    date: '2 days ago'
  },
  {
    id: 'r-02',
    author: 'Julien St. Claire',
    location: 'Mayfair, London',
    quote: 'The packaging itself is a work of couture craftsmanship. Opening the wax-sealed ribbon box was an experience my fiancée will never forget.',
    rating: 5,
    verified: true,
    date: '1 week ago'
  },
  {
    id: 'r-03',
    author: 'Dr. Clara Montgomery',
    location: 'Le Marais, Paris',
    quote: 'Their floral composition feels poetic, balanced, and deliberately slow. You can feel the master florist’s touch in every single stem.',
    rating: 5,
    verified: true,
    date: '3 weeks ago'
  }
];
