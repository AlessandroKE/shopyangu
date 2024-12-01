import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shop } from "@/components/dashboard/lib/mockData"

interface TopShopsByStockProps {
  shops: Shop[]
}

export function TopShopsByStock({ shops }: TopShopsByStockProps) {
  const topShops = shops
    .map((shop) => ({
      name: shop.name,
      stockLevel: shop.products.reduce((sum, product) => sum + product.stock, 0),
    }))
    .sort((a, b) => b.stockLevel - a.stockLevel)
    .slice(0, 5)

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Top 5 Shops by Stock Level</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Shop Name</TableHead>
              <TableHead className="text-xs text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topShops.map((shop) => (
              <TableRow key={shop.name}>
                <TableCell className="py-1 text-xs">{shop.name}</TableCell>
                <TableCell className="py-1 text-xs text-right">{shop.stockLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

