import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type OverviewMetricsProps = {
  totalShops: number
  totalProducts: number
  totalValue: number
  totalStock: number
}

export function OverviewMetrics({ totalShops, totalProducts, totalValue, totalStock }: OverviewMetricsProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalShops}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStock}</div>
        </CardContent>
      </Card>
    </>
  )
}

