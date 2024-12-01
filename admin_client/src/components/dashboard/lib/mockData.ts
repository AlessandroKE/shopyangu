export interface Shop {
  id: number;
  name: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export function generateMockData(numShops: number, maxProductsPerShop: number): Shop[] {
  const shops: Shop[] = [];

  for (let i = 1; i <= numShops; i++) {
    const numProducts = Math.floor(Math.random() * maxProductsPerShop) + 1;
    const products: Product[] = [];

    for (let j = 1; j <= numProducts; j++) {
      products.push({
        id: j,
        name: `Product ${j}`,
        price: Math.random() * 100 + 1,
        stock: Math.floor(Math.random() * 20),
      });
    }

    shops.push({
      id: i,
      name: `Shop ${i}`,
      products,
    });
  }

  return shops;
}

