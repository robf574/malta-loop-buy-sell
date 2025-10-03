import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import ListingCard from "@/components/listings/ListingCard";
import { toast } from "sonner";

interface Listing {
  id: string;
  title: string;
  price_eur: number;
  images: string[];
  condition: string;
  locality: string;
  school_id: string | null;
  schools?: {
    name: string;
  } | null;
}

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch listings
    fetchListings();

    return () => subscription.unsubscribe();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from("item_listings")
        .select(`
          *,
          schools (name)
        `)
        .eq("status", "Active")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setListings(data || []);
    } catch (error: any) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing =>
    searchQuery === "" ||
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.locality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniformListings = filteredListings.filter(l => l.school_id !== null);

  return (
    <AppLayout>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border safe-top">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Loop Malta
            </h1>
            {!user && (
              <button
                onClick={() => navigate("/auth")}
                className="text-sm font-medium text-primary hover:underline"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items or locations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <div className="sticky top-[137px] z-30 bg-background border-b border-border">
          <TabsList className="w-full justify-start rounded-none h-12 bg-transparent px-4">
            <TabsTrigger value="all">For You</TabsTrigger>
            <TabsTrigger value="uniforms">Uniforms</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4">
          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading...
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No listings found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    id={listing.id}
                    title={listing.title}
                    price={Number(listing.price_eur)}
                    images={listing.images}
                    condition={listing.condition}
                    locality={listing.locality}
                    schoolName={listing.schools?.name}
                    onClick={() => navigate(`/listing/${listing.id}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="uniforms" className="mt-0">
            {uniformListings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No uniform listings found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {uniformListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    id={listing.id}
                    title={listing.title}
                    price={Number(listing.price_eur)}
                    images={listing.images}
                    condition={listing.condition}
                    locality={listing.locality}
                    schoolName={listing.schools?.name}
                    onClick={() => navigate(`/listing/${listing.id}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={Number(listing.price_eur)}
                  images={listing.images}
                  condition={listing.condition}
                  locality={listing.locality}
                  schoolName={listing.schools?.name}
                  onClick={() => navigate(`/listing/${listing.id}`)}
                />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </AppLayout>
  );
}
