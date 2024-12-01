import { Card, CardContent } from "@/components/ui/card"
import { Building2, Package, DollarSign, BarChart3 } from 'lucide-react'
import { OverviewMetrics } from "@/types"


export function OverviewMetricsComponent({overviewMetrics}: {overviewMetrics: OverviewMetrics}) {
 

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-y">
          <MetricItem
            icon={<Building2 className="h-6 w-6 text-blue-500" />}
            label="Total Shops"
            value={overviewMetrics.totalShops.toLocaleString()}
          />
          <MetricItem
            icon={<Package className="h-6 w-6 text-green-500" />}
            label="Total Products"
            value={overviewMetrics.totalProducts.toLocaleString()}
          />
          <MetricItem
            icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
            label="Total Value"
            value={`KES ${overviewMetrics.totalValue.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}`}
          />
          <MetricItem
            icon={<BarChart3 className="h-6 w-6 text-purple-500" />}
            label="Total Stock"
            value={overviewMetrics.totalStock.toLocaleString()}
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

