
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ReminderAlert from "@/components/dashboard/ReminderAlert";
import UpcomingMedication from "@/components/dashboard/UpcomingMedication";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Sample data - in a real app, this would come from an API
  const medications = [
    {
      id: "1",
      name: "Amlodipine",
      time: "08:00 AM",
      dosage: "10mg - 1 Tablet",
      instructions: "Take with food",
      status: "taken" as const
    },
    {
      id: "2",
      name: "Metformin",
      time: "01:00 PM",
      dosage: "500mg - 2 Tablets",
      instructions: "Take after lunch",
      status: "upcoming" as const
    },
    {
      id: "3",
      name: "Atorvastatin",
      time: "09:00 PM",
      dosage: "20mg - 1 Tablet",
      instructions: "Take at bedtime",
      status: "upcoming" as const
    }
  ];

  const appointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "April 22, 2025",
      time: "10:30 AM",
      location: "Heart Care Center, Building B",
      status: "upcoming" as const
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      date: "May 5, 2025",
      time: "2:15 PM",
      location: "Diabetes & Endocrinology Clinic",
      status: "upcoming" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your health overview for today.
          </p>
        </div>
        <Button>Refresh</Button>
      </div>

      <ReminderAlert 
        title="Metformin 500mg"
        time="01:00 PM"
        type="medication"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UpcomingMedication medications={medications} />
        <AppointmentCard appointments={appointments} />
        <QuickActions />
      </div>
    </div>
  );
}
