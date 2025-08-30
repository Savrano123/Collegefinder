import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickStats({ total_students, total_faculty }: { total_students?: number; total_faculty?: number }) {
  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-xl font-space-grotesk">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk text-primary">
              {total_students ? `${Math.round(total_students / 1000)}K` : "N/A"}
            </div>
            <p className="text-sm text-muted-foreground font-dm-sans">Students</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk text-secondary">
              {total_faculty ?? "N/A"}
            </div>
            <p className="text-sm text-muted-foreground font-dm-sans">Faculty</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

