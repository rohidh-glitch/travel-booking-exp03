
const packages = [
  {
    id: "1",
    name: "Ooty Hill Escape",
    destination: "Ooty, Tamil Nadu",
    price: 6500,
    duration: 3,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    description: "Enjoy the green hills, tea gardens and peaceful mountain views of Ooty.",
  },
  {
    id: "2",
    name: "Goa Beach Holiday",
    destination: "Goa, India",
    price: 9000,
    duration: 4,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    description: "Discover beautiful beaches, coastal views and memorable sunsets in Goa.",
  },
  {
    id: "3",
    name: "Jaipur Heritage Tour",
    destination: "Jaipur, Rajasthan",
    price: 7500,
    duration: 3,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
    description: "Explore historic forts, royal architecture and the colourful culture of Jaipur.",
  },
  {
    id: "4",
    name: "Alleppey Backwater Retreat",
    destination: "Alleppey, Kerala",
    price: 8000,
    duration: 3,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    description: "Relax beside Kerala's tranquil backwaters and lush green landscapes.",
  },
  {
    id: "5",
    name: "Munnar Nature Escape",
    destination: "Munnar, Kerala",
    price: 7000,
    duration: 3,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    description: "Experience misty mountains, tea plantations and refreshing nature walks.",
  },
  {
    id: "6",
    name: "Manali Mountain Adventure",
    destination: "Manali, Himachal Pradesh",
    price: 12000,
    duration: 5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    description: "Enjoy mountain scenery, peaceful valleys and an unforgettable hill holiday.",
  },
];

export async function getPackages({ signal } = {}) {
  if (signal?.aborted) {
    throw new DOMException("Request aborted", "AbortError");
  }

  return packages;
}

export async function getPackageById(id) {
  return packages.find((pkg) => pkg.id === String(id)) || null;
}
