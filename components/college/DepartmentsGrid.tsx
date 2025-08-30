import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DepartmentsGrid({ departments }: { departments: Array<{ id: string; name: string; students: number; faculty: number; rating: number }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((dept) => (
        <Card key={dept.id} className="border-2 border-border hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2"><GraduationCap className="h-5 w-5 text-primary" /><span className="text-lg">{dept.name}</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center"><div className="text-xl font-bold font-space-grotesk text-primary">{dept.students}</div><p className="text-sm text-muted-foreground">Students</p></div>
              <div className="text-center"><div className="text-xl font-bold font-space-grotesk text-secondary">{dept.faculty}</div><p className="text-sm text-muted-foreground">Faculty</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1"><Star className="h-4 w-4 text-yellow-500 fill-current" /><span className="font-semibold">{dept.rating}</span></div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

