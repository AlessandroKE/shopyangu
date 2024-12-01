import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type TopShopsByStockProps = {
  data: Array<{ name: string; stockLevel: number }>
}

export function TopShopsByStock({ data }: TopShopsByStockProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Shop Name</TableHead>
          <TableHead>Stock Level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((shop) => (
          <TableRow key={shop.name}>
            <TableCell>{shop.name}</TableCell>
            <TableCell>{shop.stockLevel}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

