import { Card, CardContent } from "@/components/ui/card"
import { Shop } from "@/components/dashboard/lib/mockData"
import { Building2, Package, DollarSign, BarChart3 } from 'lucide-react'

interface OverviewMetricsProps {
  shops: Shop[]
}

export function OverviewMetrics({ shops }: OverviewMetricsProps) {
  const totalShops = shops.length
  const totalProducts = shops.reduce((sum, shop) => sum + shop.products.length, 0)
  const totalValue = shops.reduce(
    (sum, shop) =>
      sum + shop.products.reduce((shopSum, product) => shopSum + product.price * product.stock, 0),
    0
  )
  const totalStock = shops.reduce(
    (sum, shop) => sum + shop.products.reduce((shopSum, product) => shopSum + product.stock, 0),
    0
  )

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-y">
          <MetricItem
            icon={<Building2 className="h-6 w-6 text-blue-500" />}
            label="Total Shops"
            value={totalShops.toString()}
          />
          <MetricItem
            icon={<Package className="h-6 w-6 text-green-500" />}
            label="Total Products"
            value={totalProducts.toString()}
          />
          <MetricItem
            icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
            label="Total Value"
            value={`$${totalValue.toFixed(2)}`}
          />
          <MetricItem
            icon={<BarChart3 className="h-6 w-6 text-purple-500" />}
            label="Total Stock"
            value={totalStock.toString()}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function MetricItem({ icon, label, value }: MetricItemProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 transition-colors hover:bg-muted/50">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

