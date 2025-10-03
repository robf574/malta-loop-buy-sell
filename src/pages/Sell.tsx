import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

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
        <div>
          <h1 className="text-2xl font-bold">Sell on Loop Malta</h1>
          <p className="text-muted-foreground">List your items and reach buyers across Malta</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create a New Listing</CardTitle>
            <CardDescription>
              Share photos and details to attract buyers
            </CardDescription>
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
            <CardTitle>My Active Listings</CardTitle>
            <CardDescription>
              Manage your current listings
            </CardDescription>
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
