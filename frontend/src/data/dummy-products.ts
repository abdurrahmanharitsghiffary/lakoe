export const dummyProducts = Array.from({ length: 10 }, (_, i) => ({
  price: Math.floor(Math.random() * 50000) + 10000, // random price between 10000 and 60000
  sku: `SKU${Math.random().toString(36).substr(2, 9).toUpperCase()}`, // random SKU
  src: `https://source.unsplash.com/random/200x200?sig=${i}`, // different image for each product
  stock: Math.floor(Math.random() * 100) + 1, // random stock between 1 and 100
  title: `Product ${i + 1}`, // unique title
  isActive: i === 1 || i === 2 || i === 6,
  id: i,
}));
