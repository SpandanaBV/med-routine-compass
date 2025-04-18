
import { cn } from "@/lib/utils";
import { AlertCircle, Bell, BellRing, Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ReminderAlertProps {
  title: string;
  time: string;
  type: "medication" | "appointment";
}

export default function ReminderAlert({ title, time, type }: ReminderAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (type === "medication") {
      toast.success("Medication marked as taken!", {
        description: `${title} at ${time}`,
      });
    } else {
      toast.success("Appointment reminder acknowledged!", {
        description: `${title} at ${time}`,
      });
    }
  };

  return (
    <div className={cn(
      "mb-4 rounded-lg p-4 flex items-center justify-between",
      type === "medication" ? "bg-medical-blue/10 border border-medical-blue/20" : "bg-medical-purple/10 border border-medical-purple/20"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-full",
          type === "medication" ? "bg-medical-blue/20" : "bg-medical-purple/20"
        )}>
          {type === "medication" ? (
            <Bell className={cn("h-5 w-5 text-medical-blue")} />
          ) : (
            <AlertCircle className={cn("h-5 w-5 text-medical-purple")} />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{type === "medication" ? "Medication Reminder" : "Appointment Reminder"}</p>
          <p className="text-xs text-muted-foreground">{title} at {time}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 p-0" 
          onClick={handleDismiss}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 p-0" 
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
