import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, Library, Dumbbell, Building2 } from "lucide-react"

export function Infrastructure({ labs, libraries, sports, other }: { labs: Array<{ name: string; capacity: number; equipment: string }>; libraries: Array<{ name: string; books: number; digital_resources: string }>; sports: string[]; other: string[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-2 border-border">
        <CardHeader><CardTitle className="flex items-center space-x-2"><Microscope className="h-5 w-5 text-primary" /><span>Laboratories</span></CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {labs.map((lab, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold font-dm-sans mb-2">{lab.name}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Capacity: </span><span className="font-semibold">{lab.capacity}</span></div>
                <div><span className="text-muted-foreground">Equipment: </span><span className="font-semibold">{lab.equipment}</span></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader><CardTitle className="flex items-center space-x-2"><Library className="h-5 w-5 text-primary" /><span>Libraries</span></CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {libraries.map((library, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold font-dm-sans mb-2">{library.name}</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-muted-foreground">Books: </span><span className="font-semibold">{library.books.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Digital Resources: </span><span className="font-semibold">{library.digital_resources}</span></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader><CardTitle className="flex items-center space-x-2"><Dumbbell className="h-5 w-5 text-primary" /><span>Sports Facilities</span></CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {sports.map((facility, i) => (
              <div key={i} className="flex items-center space-x-2"><div className="w-2 h-2 bg-primary rounded-full"></div><span className="text-sm font-dm-sans">{facility}</span></div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader><CardTitle className="flex items-center space-x-2"><Building2 className="h-5 w-5 text-primary" /><span>Other Facilities</span></CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {other.map((facility, i) => (
              <div key={i} className="flex items-center space-x-2"><div className="w-2 h-2 bg-secondary rounded-full"></div><span className="text-sm font-dm-sans">{facility}</span></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

