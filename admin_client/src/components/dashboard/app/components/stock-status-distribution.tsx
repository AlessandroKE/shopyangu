"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

type StockStatusDistributionProps = {
  data: {
    inStock: number
    outOfStock: number
    lowStock: number
  }
}

export function StockStatusDistribution({ data }: StockStatusDistributionProps) {
  const chartData = [
    { name: "In Stock", value: data.inStock },
    { name: "Out of Stock", value: data.outOfStock },
    { name: "Low Stock", value: data.lowStock },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

