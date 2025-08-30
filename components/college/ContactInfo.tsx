import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Globe } from "lucide-react"

export function ContactInfo({ phone, email, website }: { phone?: string; email?: string; website?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="border-2 border-border text-center"><CardContent className="pt-6"><Phone className="h-8 w-8 text-primary mx-auto mb-4" /><h3 className="font-semibold font-space-grotesk mb-2">Phone</h3><p className="text-muted-foreground font-dm-sans">{phone}</p></CardContent></Card>
      <Card className="border-2 border-border text-center"><CardContent className="pt-6"><Mail className="h-8 w-8 text-primary mx-auto mb-4" /><h3 className="font-semibold font-space-grotesk mb-2">Email</h3><p className="text-muted-foreground font-dm-sans">{email}</p></CardContent></Card>
      <Card className="border-2 border-border text-center"><CardContent className="pt-6"><Globe className="h-8 w-8 text-primary mx-auto mb-4" /><h3 className="font-semibold font-space-grotesk mb-2">Website</h3><a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-dm-sans">Visit Website</a></CardContent></Card>
    </div>
  )
}

