
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, PanelsTopLeft, Pill, RefreshCcw } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Medication",
      icon: <Pill className="h-5 w-5" />,
      path: "/medications/add"
    },
    {
      title: "Book Appointment",
      icon: <Calendar className="h-5 w-5" />,
      path: "/appointments/book"
    },
    {
      title: "Chat with Doctor",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/chat"
    },
    {
      title: "View Health Records",
      icon: <PanelsTopLeft className="h-5 w-5" />,
      path: "/records"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button 
            key={action.title}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 card-hover"
          >
            <div className="bg-accent p-2 rounded-full">
              {action.icon}
            </div>
            <span className="text-sm text-center">{action.title}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
