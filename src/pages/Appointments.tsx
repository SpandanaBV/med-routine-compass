
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Calendar, CalendarPlus, Clock, Filter, MapPin, MoreVertical, Plus, RefreshCw, Search, User, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define type for appointment
interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "virtual";
  status: "upcoming" | "completed";
}

export default function Appointments() {
  // Sample data - in a real app, this would come from an API
  const appointments: Appointment[] = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "April 22, 2025",
      time: "10:30 AM",
      location: "Heart Care Center, Building B",
      type: "in-person",
      status: "upcoming"
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      date: "May 5, 2025",
      time: "2:15 PM",
      location: "Diabetes & Endocrinology Clinic",
      type: "in-person",
      status: "upcoming"
    },
    {
      id: "3",
      doctorName: "Dr. Emily Taylor",
      specialty: "General Practitioner",
      date: "April 10, 2025",
      time: "3:00 PM",
      location: "Video Consultation",
      type: "virtual",
      status: "completed"
    },
    {
      id: "4",
      doctorName: "Dr. Robert Williams",
      specialty: "Neurologist",
      date: "March 15, 2025",
      time: "11:45 AM",
      location: "Neurology Center, Floor 3",
      type: "in-person",
      status: "completed"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage your doctor appointments
          </p>
        </div>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({appointments.filter(apt => apt.status === "upcoming").length})</TabsTrigger>
          <TabsTrigger value="completed">Past Appointments ({appointments.filter(apt => apt.status === "completed").length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {appointments
            .filter(apt => apt.status === "upcoming")
            .map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-medical-purple/10 p-2 rounded-full h-10 w-10 flex items-center justify-center mt-1">
                      {appointment.type === "virtual" ? (
                        <Video className="h-5 w-5 text-medical-purple" />
                      ) : (
                        <User className="h-5 w-5 text-medical-purple" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.doctorName}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 md:items-end">
                    <Badge variant={appointment.type === "virtual" ? "outline" : "secondary"}>
                      {appointment.type === "virtual" ? "Virtual" : "In-Person"}
                    </Badge>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button size="sm" className="bg-medical-purple hover:bg-medical-purple/90">
                        Details
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          }
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {appointments
            .filter(apt => apt.status === "completed")
            .map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mt-1">
                      {appointment.type === "virtual" ? (
                        <Video className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.doctorName}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 md:items-end">
                    <Badge variant="outline" className="text-muted-foreground">
                      Completed
                    </Badge>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">View Summary</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          }
        </TabsContent>
      </Tabs>
    </div>
  );
}
