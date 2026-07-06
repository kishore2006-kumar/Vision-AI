import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "success" | "warning" | "danger" | "info"
  className?: string
}

const variantClasses = {
  default: "text-foreground",
  success: "text-emerald-500 dark:text-emerald-400",
  warning: "text-amber-500 dark:text-amber-400",
  danger: "text-red-500 dark:text-red-400",
  info: "text-blue-500 dark:text-blue-400",
}

const variantIconBg = {
  default: "bg-muted",
  success: "bg-emerald-500/10",
  warning: "bg-amber-500/10",
  danger: "bg-red-500/10",
  info: "bg-blue-500/10",
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  const trendPositive = trend && trend.value > 0
  const trendNeutral = trend && trend.value === 0

  return (
    <Card className={cn("relative overflow-hidden transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className={cn("text-2xl font-bold mt-1 tabular-nums", variantClasses[variant])}>
              {value}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1 truncate">{description}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trendNeutral ? (
                  <Minus className="h-3 w-3 text-muted-foreground" />
                ) : trendPositive ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    trendNeutral
                      ? "text-muted-foreground"
                      : trendPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                  )}
                >
                  {trendPositive ? "+" : ""}
                  {trend.value}% {trend.label}
                </span>
              </div>
            )}
          </div>
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", variantIconBg[variant])}>
            <Icon className={cn("h-5 w-5", variantClasses[variant])} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
