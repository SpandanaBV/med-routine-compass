
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "canceled";
}

interface AppointmentCardProps {
  appointments: Appointment[];
}

export default function AppointmentCard({ appointments }: AppointmentCardProps) {
  const upcomingAppointments = appointments.filter(appointment => appointment.status === "upcoming");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-6">
            <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No upcoming appointments</p>
          </div>
        ) : (
          upcomingAppointments.slice(0, 2).map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-4 card-hover">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-medical-purple/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-medical-purple" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.doctorName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{appointment.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{appointment.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className={cn(
        upcomingAppointments.length > 0 ? "justify-between" : "justify-center"
      )}>
        <Button variant="outline" className="w-full">
          Book New Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
