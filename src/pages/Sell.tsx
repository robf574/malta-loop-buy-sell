import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { SectionHeader, CardHeader } from "@/components/ui/Headers";

export default function Sell() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });
  }, [navigate]);

  return (
        <AppLayout>
          <div className="p-4 space-y-6">
            <SectionHeader 
              title="Sell on Mela Malta" 
              subtitle="List your items and reach buyers across Malta"
            />

            <Card>
              <CardHeader>
                <CardHeader title="Create a New Listing" subtitle="Share photos and details to attract buyers" />
              </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create Listing
            </Button>
          </CardContent>
        </Card>

            <Card>
              <CardHeader>
                <CardHeader 
                  title="Leaving the Island?" 
                  subtitle="Sell everything at once with a garage sale listing"
                />
              </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Perfect for people moving away from Malta. Set an open day where buyers can come and purchase all your belongings at once.
            </p>
            <Link to="/leaving-island">
              <Button variant="outline" className="w-full">
                <Plane className="mr-2 h-4 w-4" />
                Create Garage Sale Listing
              </Button>
            </Link>
          </CardContent>
        </Card>

            <Card>
              <CardHeader>
                <CardHeader title="My Active Listings" subtitle="Manage your current listings" />
              </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No active listings yet</p>
              <p className="text-sm">Create your first listing to get started</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
