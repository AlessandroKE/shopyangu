"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts"
import { StockStatus } from "@/types"
import { useEffect, useState } from "react"


export function StockStatusDistributionComponent({stockStatus}: {stockStatus:StockStatus}) {
  
  const [data, setData] = useState<{name: string, value: number, color: string}[]>([])

  useEffect(()=> {
    setData([
      { name: "In Stock", value: stockStatus.inStock, color: "#22c55e" },
      { name: "Low Stock", value: stockStatus.lowStock, color: "#f97316" },
      { name: "Out of Stock", value: stockStatus.outOfStock, color: "#ef4444" },
    ])
  }, [stockStatus])

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Stock Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Legend />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

