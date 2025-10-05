import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Clock, Users, Package, Star, Plus, X, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";

interface FeaturedItem {
  name: string;
  description: string;
  image_url: string;
  estimated_value_eur: number;
}

interface GarageSale {
  id: string;
  title: string;
  description: string;
  location: string;
  open_date: string;
  open_time: string;
  contact_info: string;
  items_count: number;
  created_at: string;
  user_id: string;
  featured_items?: FeaturedItem[];
}

export default function LeavingIsland() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [garageSales, setGarageSales] = useState<GarageSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    open_date: undefined as Date | undefined,
    open_time: "",
    contact_info: "",
    items_count: ""
  });

  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    fetchGarageSales();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchGarageSales = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("garage_sales")
        .select(`
          *,
          featured_items (
            name,
            description,
            image_url,
            estimated_value_eur
          )
        `)
        .order("open_date", { ascending: true });

      if (error) throw error;
      setGarageSales(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch garage sales");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addFeaturedItem = () => {
    if (featuredItems.length >= 5) {
      toast.error("Maximum 5 featured items allowed");
      return;
    }
    setFeaturedItems([...featuredItems, {
      name: "",
      description: "",
      image_url: "",
      estimated_value_eur: 0
    }]);
  };

  const removeFeaturedItem = (index: number) => {
    setFeaturedItems(featuredItems.filter((_, i) => i !== index));
  };

  const updateFeaturedItem = (index: number, field: keyof FeaturedItem, value: string | number) => {
    const updated = [...featuredItems];
    updated[index] = { ...updated[index], [field]: value };
    setFeaturedItems(updated);
  };

  const handleImageUpload = async (file: File, index: number) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `garage-sale-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('garage-sale-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('garage-sale-images')
        .getPublicUrl(filePath);

      updateFeaturedItem(index, 'image_url', data.publicUrl);
    } catch (error: any) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.open_date) {
      toast.error("Please select an open date");
      return;
    }

    try {
      // Create garage sale
      const { data: garageSale, error } = await supabase
        .from("garage_sales")
        .insert({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          open_date: formData.open_date.toISOString().split('T')[0],
          open_time: formData.open_time,
          contact_info: formData.contact_info,
          items_count: parseInt(formData.items_count) || 0,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      // Create featured items if any
      if (featuredItems.length > 0) {
        const featuredItemsData = featuredItems
          .filter(item => item.name.trim() !== "")
          .map((item, index) => ({
            garage_sale_id: garageSale.id,
            name: item.name,
            description: item.description,
            image_url: item.image_url,
            estimated_value_eur: item.estimated_value_eur,
            sort_order: index + 1
          }));

        if (featuredItemsData.length > 0) {
          const { error: featuredError } = await supabase
            .from("featured_items")
            .insert(featuredItemsData);

          if (featuredError) throw featuredError;
        }
      }

      toast.success("Garage sale listed successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        open_date: undefined,
        open_time: "",
        contact_info: "",
        items_count: ""
      });
      setFeaturedItems([]);
      setShowForm(false);
      fetchGarageSales();
    } catch (error: any) {
      toast.error("Failed to create garage sale listing");
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading garage sales...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaving the Island</h1>
          <p className="text-muted-foreground mb-6">
            List your garage sale for people leaving Malta. Set an open day where buyers can come and purchase everything at once.
          </p>
          <Button onClick={() => setShowForm(true)} className="mb-6">
            <Package className="mr-2 h-4 w-4" />
            List Your Garage Sale
          </Button>
        </div>

        {/* Garage Sales List */}
        <div className="space-y-4">
          {garageSales.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No garage sales yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to list a garage sale for people leaving Malta!
                </p>
                <Button onClick={() => setShowForm(true)}>
                  List Your Garage Sale
                </Button>
              </CardContent>
            </Card>
          ) : (
            garageSales.map((sale) => (
              <Card key={sale.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{sale.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {sale.description}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {sale.items_count} items
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                        <span className="font-medium">Open Day:</span>
                        <span>{formatDate(sale.open_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">Time:</span>
                        <span>{sale.open_time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">Location:</span>
                        <span>{sale.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Contact:</span>
                        <span>{sale.contact_info}</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Items Display */}
                  {sale.featured_items && sale.featured_items.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Featured Items
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sale.featured_items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded border"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.name}</p>
                              {item.description && (
                                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                              )}
                              {item.estimated_value_eur > 0 && (
                                <p className="text-xs font-semibold text-green-600">€{item.estimated_value_eur}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Create Garage Sale Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>List Your Garage Sale</CardTitle>
                <CardDescription>
                  Create a listing for people leaving Malta to sell all their belongings at once.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Moving Sale - Everything Must Go!"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what you're selling and any special items..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Sliema, Malta"
                      required
                    />
                  </div>

                  <div>
                    <Label>Open Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.open_date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.open_date ? format(formData.open_date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.open_date}
                          onSelect={(date) => setFormData({ ...formData, open_date: date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="open_time">Open Time *</Label>
                    <Input
                      id="open_time"
                      type="time"
                      value={formData.open_time}
                      onChange={(e) => setFormData({ ...formData, open_time: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="items_count">Estimated Number of Items</Label>
                    <Input
                      id="items_count"
                      type="number"
                      value={formData.items_count}
                      onChange={(e) => setFormData({ ...formData, items_count: e.target.value })}
                      placeholder="e.g., 50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_info">Contact Information *</Label>
                    <Input
                      id="contact_info"
                      value={formData.contact_info}
                      onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                      placeholder="Phone number or WhatsApp"
                      required
                    />
                  </div>

                  {/* Featured Items Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          Featured Items (Optional)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Highlight your top 5 most valuable items with photos
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFeaturedItem}
                        disabled={featuredItems.length >= 5}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Item
                      </Button>
                    </div>

                    {featuredItems.map((item, index) => (
                      <Card key={index} className="mb-4">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Featured Item {index + 1}</CardTitle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeaturedItem(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor={`item-name-${index}`}>Item Name *</Label>
                            <Input
                              id={`item-name-${index}`}
                              value={item.name}
                              onChange={(e) => updateFeaturedItem(index, 'name', e.target.value)}
                              placeholder="e.g., Designer Sofa"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`item-desc-${index}`}>Description</Label>
                            <Textarea
                              id={`item-desc-${index}`}
                              value={item.description}
                              onChange={(e) => updateFeaturedItem(index, 'description', e.target.value)}
                              placeholder="Describe the item's condition, brand, etc."
                              rows={2}
                            />
                          </div>

                          <div>
                            <Label htmlFor={`item-value-${index}`}>Estimated Value (€)</Label>
                            <Input
                              id={`item-value-${index}`}
                              type="number"
                              value={item.estimated_value_eur}
                              onChange={(e) => updateFeaturedItem(index, 'estimated_value_eur', parseFloat(e.target.value) || 0)}
                              placeholder="e.g., 500"
                            />
                          </div>

                          <div>
                            <Label>Photo</Label>
                            <div className="flex items-center gap-4">
                              {item.image_url ? (
                                <div className="relative">
                                  <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg border"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                    onClick={() => updateFeaturedItem(index, 'image_url', '')}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="w-20 h-20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                                  <Upload className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file, index);
                                  }}
                                  className="hidden"
                                  id={`image-upload-${index}`}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById(`image-upload-${index}`)?.click()}
                                >
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload Photo
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {featuredItems.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No featured items yet</p>
                        <p className="text-sm">Add items to highlight your most valuable pieces</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      List Garage Sale
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
