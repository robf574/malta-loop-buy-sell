import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-amber-200">
        <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 py-6 rounded-t-lg">
          <div className="text-6xl font-black text-amber-800 mb-2">404</div>
          <CardTitle className="text-2xl font-bold text-amber-800">Page Not Found</CardTitle>
          <CardDescription className="text-amber-600 mt-2">
            The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-muted-foreground">
            Don't worry! Let's get you back to exploring Malta's marketplace.
          </p>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="javascript:history.back()">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
