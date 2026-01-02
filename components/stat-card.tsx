"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: string
  label: string
  value: string | number
  unit?: string
  color?: "primary" | "secondary" | "accent" | "green" | "orange" | "purple"
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function StatCard({
  icon,
  label,
  value,
  unit,
  color = "primary",
  trend,
}: StatCardProps) {
  const colorGradients = {
    primary: "from-primary/20 to-primary/10 border-primary/30",
    secondary: "from-secondary/20 to-secondary/10 border-secondary/30",
    accent: "from-accent/20 to-accent/10 border-accent/30",
    green: "from-green-500/20 to-green-500/10 border-green-500/30",
    orange: "from-orange-500/20 to-orange-500/10 border-orange-500/30",
    purple: "from-purple-500/20 to-purple-500/10 border-purple-500/30",
  }

  return (
    <Card
      className={cn(
        "p-5 sm:p-6 bg-gradient-to-br rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl",
        colorGradients[color]
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl sm:text-3xl">{icon}</span>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{label}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{value}</p>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend && (
            <p
              className={cn(
                "text-xs font-semibold mt-2",
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% desde ayer
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
