
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-6xl font-bold text-medical-blue mb-4">404</h1>
        <p className="text-2xl text-foreground mb-6">Page not found</p>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Button asChild className="bg-medical-blue hover:bg-medical-blue/90">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
