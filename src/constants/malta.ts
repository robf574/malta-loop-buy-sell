// Malta localities for the dropdown
export const MALTA_LOCALITIES = [
  "Attard", "Balzan", "Birgu", "Birkirkara", "Birżebbuġa", "Cospicua", "Dingli",
  "Fgura", "Floriana", "Fontana", "Għajnsielem", "Għarb", "Għargħur", "Għasri",
  "Għaxaq", "Gudja", "Gżira", "Ħamrun", "Iklin", "Kalkara", "Kerċem", "Kirkop",
  "Lija", "Luqa", "Marsa", "Marsaskala", "Marsaxlokk", "Mdina", "Mellieħa",
  "Mġarr", "Mosta", "Mqabba", "Msida", "Mtarfa", "Munxar", "Nadur", "Naxxar",
  "Paola", "Pembroke", "Pietà", "Qala", "Qormi", "Qrendi", "Rabat (Gozo)",
  "Rabat (Malta)", "Safi", "San Ġwann", "San Lawrenz", "San Pawl il-Baħar",
  "Sannat", "Santa Luċija", "Santa Venera", "Siġġiewi", "Sliema",
  "St. Julian's", "Swieqi", "Ta' Xbiex", "Tarxien", "Valletta", "Victoria",
  "Xagħra", "Xewkija", "Xgħajra", "Żabbar", "Żebbuġ (Gozo)", "Żebbuġ (Malta)",
  "Żejtun", "Żurrieq"
].sort();

// Categories for listings and wanted ads
export const LISTING_CATEGORIES = [
  { value: "Clothing", label: "Clothing" },
  { value: "Uniform", label: "School Uniform" },
  { value: "Kids", label: "Kids & Toys" },
  { value: "Home", label: "Home & Garden" },
  { value: "Other", label: "Other" },
] as const;

export const ITEM_CONDITIONS = [
  { value: "New", label: "New" },
  { value: "Like New", label: "Like New" },
  { value: "Good", label: "Good" },
  { value: "Fair", label: "Fair" },
] as const;
