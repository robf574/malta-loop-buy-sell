import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, MapPin } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/Headers";

interface WantedAd {
  id: string;
  title: string;
  description: string;
  category: string;
  locality: string;
  budget_eur: number | null;
  user_id: string;
}

export default function Wanted() {
  const navigate = useNavigate();
  const [ads, setAds] = useState<WantedAd[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchWantedAds();
  }, []);

  const fetchWantedAds = async () => {
    try {
      const { data, error } = await supabase
        .from("wanted_ads")
        .select("*")
        .eq("status", "Active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error("Error fetching wanted ads:", error);
    }
  };

  const filteredAds = ads.filter(ad =>
    searchQuery === "" ||
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <SectionHeader 
          title="Wanted Ads" 
          subtitle="Help others find what they're looking for"
        />

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wanted ads..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Create Button */}
        <Button className="w-full" onClick={() => navigate("/wanted/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Post a Wanted Ad
        </Button>

        {/* Ads List */}
        <div className="space-y-3">
          {filteredAds.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No wanted ads yet. Be the first to post!
              </CardContent>
            </Card>
          ) : (
            filteredAds.map((ad) => (
              <Card key={ad.id} className="cursor-pointer hover:shadow-md transition-smooth">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{ad.title}</CardTitle>
                    {ad.budget_eur && (
                      <span className="font-bold text-primary whitespace-nowrap">
                        €{ad.budget_eur}
                      </span>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {ad.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="secondary">{ad.category}</Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{ad.locality}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
