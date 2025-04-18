
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  ChevronLeft, 
  Home, 
  MessageSquare, 
  PanelsTopLeft, 
  Pill, 
  Settings, 
  X 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const navItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/"
    },
    {
      title: "Medications",
      icon: <Pill className="h-5 w-5" />,
      path: "/medications"
    },
    {
      title: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
      path: "/appointments"
    },
    {
      title: "Chat with Doctor",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/chat"
    },
    {
      title: "Health Records",
      icon: <PanelsTopLeft className="h-5 w-5" />,
      path: "/records"
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings"
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-sm transform transition-transform duration-200 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-medical-blue p-1 rounded-md">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-semibold text-lg">MedRoutine</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="hidden md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col gap-1 p-2 flex-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent group transition-colors",
                  location.pathname === item.path && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <span className={cn(
                  "text-muted-foreground group-hover:text-foreground",
                  location.pathname === item.path && "text-primary-foreground"
                )}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t mt-auto">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" alt="User Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
