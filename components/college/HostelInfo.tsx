import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Wifi, Utensils } from "lucide-react"

export function HostelInfo({ info }: { info: { total_hostels: number; total_capacity: number; availability: string; hostel_types: string[]; amenities: string[]; rules: string; mess_timings: Record<string, string> } }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2"><Home className="h-5 w-5 text-primary" /><span>Overview</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk text-primary">{info.total_hostels}</div>
              <p className="text-sm text-muted-foreground">Total Hostels</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk text-secondary">{info.total_capacity.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Capacity</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-dm-sans">Availability</span>
              <Badge className="bg-green-100 text-green-700 border-green-200">{info.availability}</Badge>
            </div>
            <div>
              <span className="font-dm-sans font-semibold">Room Types:</span>
              <div className="mt-2 space-y-1">
                {info.hostel_types.map((t, i) => (<Badge key={i} variant="outline" className="mr-2">{t}</Badge>))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2"><Wifi className="h-5 w-5 text-primary" /><span>Amenities</span></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {info.amenities.map((a, i) => (
              <div key={i} className="flex items-center space-x-2"><div className="w-2 h-2 bg-primary rounded-full"></div><span className="text-sm font-dm-sans">{a}</span></div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2"><Utensils className="h-5 w-5 text-primary" /><span>Mess Timings</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(info.mess_timings).map(([meal, timing]) => (
            <div key={meal} className="flex justify-between items-center"><span className="font-dm-sans capitalize">{meal}</span><span className="text-sm text-muted-foreground">{timing}</span></div>
          ))}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">{info.rules}</p></div>
        </CardContent>
      </Card>
    </div>
  )
}

