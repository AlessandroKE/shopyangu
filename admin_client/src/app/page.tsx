import { OverviewMetrics } from "@/components/dashboard/components/OverviewMetrics"
import { StockStatusDistribution } from "@/components/dashboard/components/StockStatusDistribution"
import { TopShopsByStock } from "@/components/dashboard/components/TopShopsByStock"
import { generateMockData } from "@/components/dashboard/lib/mockData"

export default function DashboardPage() {
  const shops = generateMockData(20, 50)

  return (
    <div className="container mx-auto p-2">
      {/* <h1 className="text-3xl font-bold mb-6">Dashboard</h1> */}
      <div className="flex flex-1 flex-col gap-2 p-2 pt-0">
        <div className="grid auto-rows-min gap-2 md:grid-cols-3">
          <div className="md:col-span-2">
            <OverviewMetrics shops={shops} />
          </div>
          <div className="h-full">
            <TopShopsByStock shops={shops} />
          </div>
          <div className="md:col-span-3">
            <StockStatusDistribution shops={shops} />
          </div>
        </div>
      </div>
    </div>
  )
}

