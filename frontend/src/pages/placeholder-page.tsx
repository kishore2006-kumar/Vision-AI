import { type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"

interface PlaceholderPageProps {
  title: string
  description: string
  icon: LucideIcon
  features?: string[]
}

export function PlaceholderPage({ title, description, icon: Icon, features = [] }: PlaceholderPageProps) {
  return (
    <div className="p-6 space-y-6 max-w-[900px]">
      <PageHeader title={title} description={description}>
        <Badge variant="secondary" className="text-xs">Coming soon</Badge>
      </PageHeader>

      <Card className="border-dashed">
        <CardContent className="py-16 flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-base font-semibold">{title} module</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {features.map(f => (
                <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
