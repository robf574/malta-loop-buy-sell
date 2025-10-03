import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Search, MapPin, Phone, Mail, Globe } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  locality: string;
  phone?: string;
  email?: string;
  website?: string;
  pricing_info?: string;
  images: string[];
}

export default function Services() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });
    fetchServices();
  }, [navigate]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("status", "Active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getAIRecommendations = async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("recommend-services", {
        body: { query: searchQuery },
      });

      if (error) throw error;

      toast({
        title: "AI Recommendations",
        description: data.recommendation,
      });
    } catch (error) {
      console.error("Error getting AI recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get AI recommendations",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Services in Malta</h1>
          <p className="text-muted-foreground">Find trusted local services</p>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            onClick={getAIRecommendations}
            disabled={aiLoading || !searchQuery}
            variant="outline"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Help
          </Button>
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Tailoring">Tailoring</SelectItem>
            <SelectItem value="Cobbler">Cobbler</SelectItem>
            <SelectItem value="Alterations">Alterations</SelectItem>
            <SelectItem value="Dry Cleaning">Dry Cleaning</SelectItem>
            <SelectItem value="Repairs">Repairs</SelectItem>
            <SelectItem value="Home Services">Home Services</SelectItem>
            <SelectItem value="Beauty Services">Beauty Services</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid gap-4">
          {loading ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Loading services...</p>
              </CardContent>
            </Card>
          ) : filteredServices.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">No services found</p>
              </CardContent>
            </Card>
          ) : (
            filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {service.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{service.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {service.locality}
                  </div>

                  {service.pricing_info && (
                    <p className="text-sm font-medium">💶 {service.pricing_info}</p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.phone && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${service.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </a>
                      </Button>
                    )}
                    {service.email && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${service.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    )}
                    {service.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={service.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
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
