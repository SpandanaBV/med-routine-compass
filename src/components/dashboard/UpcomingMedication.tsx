
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Pill } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  time: string;
  dosage: string;
  instructions?: string;
  status: "upcoming" | "missed" | "taken";
}

interface UpcomingMedicationProps {
  medications: Medication[];
}

export default function UpcomingMedication({ medications }: UpcomingMedicationProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Medications</CardTitle>
          <Badge variant="outline">{medications.length} medications</Badge>
        </div>
        <CardDescription>Today's medication schedule</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {medications.map((medication) => (
          <div 
            key={medication.id}
            className={cn(
              "flex items-center justify-between p-3 border rounded-lg",
              medication.status === "upcoming" && "border-medical-blue bg-blue-50",
              medication.status === "missed" && "border-medical-red bg-red-50",
              medication.status === "taken" && "border-medical-green bg-green-50"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full",
                medication.status === "upcoming" && "bg-medical-blue/20",
                medication.status === "missed" && "bg-medical-red/20",
                medication.status === "taken" && "bg-medical-green/20"
              )}>
                <div className={cn(
                  medication.status === "upcoming" && "pill-animation"
                )}>
                  <Pill className={cn(
                    "h-5 w-5",
                    medication.status === "upcoming" && "text-medical-blue",
                    medication.status === "missed" && "text-medical-red",
                    medication.status === "taken" && "text-medical-green"
                  )} />
                </div>
              </div>
              <div>
                <p className="font-medium">{medication.name}</p>
                <p className="text-xs text-muted-foreground">{medication.dosage}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{medication.time}</span>
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs mt-1",
                  medication.status === "upcoming" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                  medication.status === "missed" && "bg-red-100 text-red-800 hover:bg-red-100",
                  medication.status === "taken" && "bg-green-100 text-green-800 hover:bg-green-100"
                )}
              >
                {medication.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <span>View all medications</span>
          <span>{medications.filter(m => m.status === "taken").length} taken today</span>
        </div>
      </CardFooter>
    </Card>
  );
}
