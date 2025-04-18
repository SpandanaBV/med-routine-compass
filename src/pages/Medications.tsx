
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CalendarClock, Check, Clock, Filter, Plus, RefreshCw, Search, X } from "lucide-react";

export default function Medications() {
  // Sample data - in a real app, this would come from an API
  const medications = [
    {
      id: "1",
      name: "Amlodipine",
      purpose: "Blood pressure",
      schedule: "Daily - Morning",
      time: "08:00 AM",
      dosage: "10mg - 1 Tablet",
      startDate: "Jan 10, 2025",
      endDate: "Ongoing",
      refills: 3,
      instructions: "Take with food",
      status: "active" as const
    },
    {
      id: "2",
      name: "Metformin",
      purpose: "Diabetes",
      schedule: "Twice Daily",
      time: "01:00 PM & 09:00 PM",
      dosage: "500mg - 2 Tablets",
      startDate: "Feb 5, 2025",
      endDate: "Ongoing",
      refills: 2,
      instructions: "Take after meals",
      status: "active" as const
    },
    {
      id: "3",
      name: "Atorvastatin",
      purpose: "Cholesterol",
      schedule: "Daily - Evening",
      time: "09:00 PM",
      dosage: "20mg - 1 Tablet",
      startDate: "Jan 15, 2025",
      endDate: "Ongoing",
      refills: 5,
      instructions: "Take at bedtime",
      status: "active" as const
    },
    {
      id: "4",
      name: "Amoxicillin",
      purpose: "Infection",
      schedule: "Three times daily",
      time: "08:00 AM, 02:00 PM, 08:00 PM",
      dosage: "250mg - 1 Capsule",
      startDate: "Mar 20, 2025",
      endDate: "Mar 30, 2025",
      refills: 0,
      instructions: "Take until completed",
      status: "completed" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medications</h1>
          <p className="text-muted-foreground">
            Manage and track your prescribed medications
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medications..."
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

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active ({medications.filter(med => med.status === "active").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({medications.filter(med => med.status === "completed").length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          {medications
            .filter(med => med.status === "active")
            .map((medication) => (
              <Card key={medication.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-medical-blue/10 p-2 rounded-full h-10 w-10 flex items-center justify-center mt-1">
                      <Clock className="h-5 w-5 text-medical-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">{medication.name}</h3>
                      <p className="text-sm text-muted-foreground">{medication.purpose}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="reminder-pill">
                          <Clock className="h-4 w-4" />
                          {medication.schedule}
                        </span>
                        <span className="reminder-pill">
                          <CalendarClock className="h-4 w-4" />
                          {medication.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 md:items-end">
                    <p className="text-sm font-medium">{medication.dosage}</p>
                    <p className="text-xs text-muted-foreground">
                      Started: {medication.startDate} • Refills: {medication.refills}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button size="sm" className="bg-medical-green hover:bg-medical-green/90">
                        <Check className="mr-1 h-4 w-4" />
                        Take
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          }
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {medications
            .filter(med => med.status === "completed")
            .map((medication) => (
              <Card key={medication.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mt-1">
                      <Check className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{medication.name}</h3>
                      <p className="text-sm text-muted-foreground">{medication.purpose}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="reminder-pill">
                          <Clock className="h-4 w-4" />
                          {medication.schedule}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 md:items-end">
                    <p className="text-sm font-medium">{medication.dosage}</p>
                    <p className="text-xs text-muted-foreground">
                      {medication.startDate} - {medication.endDate}
                    </p>
                    <Button variant="outline" size="sm">View History</Button>
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
