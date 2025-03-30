import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Settings2 } from "lucide-react"
import { HeatSourceType } from "../types/calculator"

interface HeatSourceCardProps {
  name: string
  details: string
  amount: number
  onEdit: () => void
  type: HeatSourceType
}

export function HeatSourceCard({ name, details, amount, onEdit, type }: HeatSourceCardProps) {
  return (
    <Card className="mb-4 bg-white border border-gray-200 rounded shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="text-left">
            <h2 className="text-lg font-normal capitalize">{name}</h2>
            {details && <p className="text-sm text-gray-600 mt-1">{details}</p>}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg">
              ${amount.toLocaleString()}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onEdit} 
              className="text-gray-600 hover:text-gray-800 p-1"
            >
              <Settings2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 