import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MALTA_LOCALITIES } from "@/constants/malta";
import { FASHION_BRANDS } from "@/constants/brands";
import { X, Check } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function Onboarding() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [locality, setLocality] = useState("");
  const [ownedBrands, setOwnedBrands] = useState<string[]>([]);
  const [wishlistBrands, setWishlistBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });
  }, [navigate]);

  const toggleOwnedBrand = (brand: string) => {
    setOwnedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleWishlistBrand = (brand: string) => {
    setWishlistBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredBrands = brandSearch
    ? FASHION_BRANDS.filter(brand => 
        brand.toLowerCase().includes(brandSearch.toLowerCase())
      )
    : FASHION_BRANDS;

  const handleStepOne = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          username,
          localities: [locality],
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Save brand preferences
      const { error: brandError } = await supabase
        .from("user_brand_preferences")
        .insert({
          user_id: user.id,
          owned_brands: ownedBrands,
          wishlist_brands: wishlistBrands,
        });

      if (brandError) throw brandError;

      toast.success("Welcome to Mela Malta!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to complete onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>
              {step === 1 ? "Complete Your Profile" : "Your Brand Preferences"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Tell us about yourself"
                : "Help us match you with items you'll love (Step 2 of 2)"
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleStepOne} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    pattern="^[a-zA-Z0-9_]{3,20}$"
                    title="3-20 characters, letters, numbers, and underscores only"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locality">Your Locality</Label>
                  <Select value={locality} onValueChange={setLocality} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your locality" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {MALTA_LOCALITIES.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            ) : (
              <form onSubmit={handleComplete} className="space-y-6">
                {/* Owned Brands */}
                <div className="space-y-3">
                  <div>
                    <Label>Brands You Own or Buy</Label>
                    <p className="text-sm text-muted-foreground">
                      We'll alert people looking for these brands
                    </p>
                  </div>
                  
                  <Input
                    placeholder="Search brands..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                  />

                  <div className="max-h-[200px] overflow-y-auto border rounded-md p-3 space-y-2">
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => toggleOwnedBrand(brand)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth flex items-center justify-between ${
                          ownedBrands.includes(brand)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {brand}
                        {ownedBrands.includes(brand) && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>

                  {ownedBrands.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {ownedBrands.map((brand) => (
                        <Badge key={brand} variant="secondary" className="gap-1">
                          {brand}
                          <button
                            type="button"
                            onClick={() => toggleOwnedBrand(brand)}
                            className="hover:bg-destructive/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Wishlist Brands */}
                <div className="space-y-3">
                  <div>
                    <Label>Brands You Want to Own</Label>
                    <p className="text-sm text-muted-foreground">
                      We'll notify you when these brands appear
                    </p>
                  </div>

                  <div className="max-h-[200px] overflow-y-auto border rounded-md p-3 space-y-2">
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => toggleWishlistBrand(brand)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth flex items-center justify-between ${
                          wishlistBrands.includes(brand)
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {brand}
                        {wishlistBrands.includes(brand) && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>

                  {wishlistBrands.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {wishlistBrands.map((brand) => (
                        <Badge key={brand} className="gap-1 bg-accent text-accent-foreground">
                          {brand}
                          <button
                            type="button"
                            onClick={() => toggleWishlistBrand(brand)}
                            className="hover:bg-destructive/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Setting up..." : "Complete Setup"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
