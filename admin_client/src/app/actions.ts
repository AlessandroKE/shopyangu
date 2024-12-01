'use server'

import { HttpClient } from '@/services/http';
import { Product, Shop } from '@/types';


export async function getDashboardMetrics() {
  const httpClient = new HttpClient()
  const [shops, products] = await Promise.all([
      httpClient.get<Shop[]>('shops'),
      httpClient.get<Product[]>('products')
  ]);

  const totalShops = shops.length;
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  const stockStatus = products.reduce(
    (acc, product) => {
      if (product.stock === 0) acc.outOfStock++;
      else if (product.stock <= 5) acc.lowStock++;
      else acc.inStock++;
      return acc;
    },
    { inStock: 0, outOfStock: 0, lowStock: 0 }
  );

  const topShopsByStock = shops.map(shop => {
    const shopProducts = products.filter(product => product.shopId === shop.id);
    const stockLevel = shopProducts.reduce((sum, product) => sum + product.stock, 0);
    return { id: shop.id, name: shop.name, stockLevel };
  }).sort((a, b) => b.stockLevel - a.stockLevel).slice(0, 5);

  return {
    overviewMetrics: {
      totalShops,
      totalProducts,
      totalValue,
      totalStock,
    },
    stockStatus,
    topShopsByStock,
  };
}
