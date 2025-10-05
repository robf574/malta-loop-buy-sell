// Realistic dummy listings for Malta marketplace
export const dummyListings = [
  // School Uniforms
  {
    id: "dummy-1",
    title: "St. Edward's College Uniform - Size 12",
    price_eur: 25,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Sliema",
    school_id: "st-edwards",
    schools: { name: "St. Edward's College" },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-2", 
    title: "De La Salle College Blazer - Size 14",
    price_eur: 45,
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "Valletta",
    school_id: "de-la-salle",
    schools: { name: "De La Salle College" },
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-3",
    title: "St. Joseph School Skirt Set - Age 8-9",
    price_eur: 18,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Birkirkara",
    school_id: "st-joseph",
    schools: { name: "St. Joseph School" },
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-4",
    title: "St. Aloysius College PE Kit - Size 10",
    price_eur: 15,
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"],
    condition: "Fair",
    locality: "Birkirkara",
    school_id: "st-aloysius",
    schools: { name: "St. Aloysius College" },
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // Children's Clothing
  {
    id: "dummy-5",
    title: "Children's Winter Jacket - Age 6-7",
    price_eur: 20,
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "St. Julian's",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-6",
    title: "Girl's Summer Dress Collection - Size 8-10",
    price_eur: 35,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Mosta",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-7",
    title: "Boys' Cargo Shorts - Size 12-14",
    price_eur: 12,
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Rabat",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // Baby Items
  {
    id: "dummy-8",
    title: "Baby Clothes Bundle - 0-6 months",
    price_eur: 25,
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "Sliema",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-9",
    title: "Baby Walker - Almost New",
    price_eur: 40,
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "Valletta",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // Toys & Games
  {
    id: "dummy-10",
    title: "LEGO City Set - Complete",
    price_eur: 30,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Birkirkara",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-11",
    title: "Barbie Doll Collection - 5 dolls",
    price_eur: 20,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "St. Julian's",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // Books & Educational
  {
    id: "dummy-12",
    title: "Malta History Books - Primary School",
    price_eur: 15,
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Mosta",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-13",
    title: "English Literature GCSE Books",
    price_eur: 25,
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "Sliema",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // Sports Equipment
  {
    id: "dummy-14",
    title: "Football Boots - Size 6",
    price_eur: 18,
    images: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Rabat",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-15",
    title: "Swimming Goggles & Cap Set",
    price_eur: 8,
    images: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "St. Julian's",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // Electronics
  {
    id: "dummy-16",
    title: "Children's Tablet - Samsung Galaxy Tab Kids",
    price_eur: 80,
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Valletta",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-17",
    title: "Nintendo Switch Games Bundle",
    price_eur: 45,
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "Birkirkara",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // Home Items
  {
    id: "dummy-18",
    title: "Children's Desk & Chair Set",
    price_eur: 60,
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Mosta",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },
  {
    id: "dummy-19",
    title: "Kids' Bedroom Lamp - Space Theme",
    price_eur: 15,
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
    condition: "Excellent",
    locality: "Sliema",
    school_id: null,
    schools: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  },

  // More School Uniforms
  {
    id: "dummy-20",
    title: "St. Catherine's School Shirt - Size 10",
    price_eur: 12,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"],
    condition: "Good",
    locality: "Pembroke",
    school_id: "st-catherines",
    schools: { name: "St. Catherine's School" },
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active"
  }
];

export const getDummyListings = () => {
  // Shuffle the array to make it feel more dynamic
  return [...dummyListings].sort(() => Math.random() - 0.5);
};
