import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee } from "lucide-react"

export function FeeStructure({ summary, breakdown }: { summary: { tuition_fees: string; hostel_fees: string; mess_fees: string; other_fees: string; total_annual_fees: string }; breakdown: Array<{ category: string; amount: string; description: string }> }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            <span>Annual Fee Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Tuition Fees', value: summary.tuition_fees },
            { label: 'Hostel Fees', value: summary.hostel_fees },
            { label: 'Mess Fees', value: summary.mess_fees },
            { label: 'Other Fees', value: summary.other_fees },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-border">
              <span className="font-dm-sans">{row.label}</span>
              <span className="font-semibold">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center py-3 bg-primary/10 px-4 rounded-lg">
            <span className="font-semibold font-dm-sans">Total Annual Fees</span>
            <span className="font-bold text-lg text-primary">{summary.total_annual_fees}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {breakdown.map((fee, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold font-dm-sans">{fee.category}</h4>
                <span className="font-bold text-primary">{fee.amount}</span>
              </div>
              <p className="text-sm text-muted-foreground">{fee.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

