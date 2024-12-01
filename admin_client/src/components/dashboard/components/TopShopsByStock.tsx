import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TopShopsByStock } from "@/types"


export function TopShopsByStockComponent({topShopsByStock}: {topShopsByStock: TopShopsByStock[]}) {
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-weight-500">Top 5 Shops by Stock Level</CardTitle>
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
            {topShopsByStock.map((shop) => (
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

