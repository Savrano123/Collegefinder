import { GraduationCap, MapPin, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero({ college }: { college: { name: string; short_name?: string; location: string; logo_url?: string; rating: number; total_reviews: number } }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-start space-x-6 mb-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            {college.logo_url ? (
              <Image src={college.logo_url} alt={`${college.name} logo`} fill className="object-contain rounded-xl border-2 border-border bg-card" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-primary-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold font-space-grotesk text-foreground mb-2">{college.name}</h1>
                {college.short_name && college.short_name !== college.name && (
                  <p className="text-xl text-muted-foreground font-dm-sans mb-3">{college.short_name}</p>
                )}
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg text-muted-foreground font-dm-sans">{college.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  )
}

