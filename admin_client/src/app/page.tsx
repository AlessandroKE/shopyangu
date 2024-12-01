'use client'

import { OverviewMetricsComponent } from "@/components/dashboard/components/OverviewMetrics"
import { StockStatusDistributionComponent } from "@/components/dashboard/components/StockStatusDistribution"
import { TopShopsByStockComponent } from "@/components/dashboard/components/TopShopsByStock"
import { getDashboardMetrics } from "./actions"
import { useEffect, useState } from "react"
import { Metrics } from "@/types"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  // const shops = generateMockData(20, 50)
  const [metrics, setMetrics] = useState<Metrics | null>(null)

  useEffect(()=> {
    getDashboardMetrics().then((res)=> {
      setMetrics(res)
    })
  }, [])

  return (
    <div className="container mx-auto p-2 h-full">
      {metrics ?
        <div className="flex flex-1 flex-col gap-2 p-2 pt-0">
          <div className="grid auto-rows-min gap-2 md:grid-cols-3">
            <div className="md:col-span-2">
              {metrics?.overviewMetrics && <OverviewMetricsComponent overviewMetrics={metrics.overviewMetrics} />}
            </div>
            <div className="h-full">
              {metrics?.topShopsByStock && <TopShopsByStockComponent topShopsByStock={metrics.topShopsByStock} />}
            </div>
            <div className="md:col-span-3">
              {metrics?.stockStatus && <StockStatusDistributionComponent stockStatus={metrics?.stockStatus} />}
            </div>
          </div>
        </div>
      :
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin inline-block" />
        </div>
      }
    </div>
  )
}

