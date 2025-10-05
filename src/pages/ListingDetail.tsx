import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Heart, 
  Share2, 
  MessageCircle, 
  Phone, 
  Mail,
  Star,
  Shield,
  Truck,
  Clock,
  Package,
  Euro
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";

export default function ListingDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  // Mock listing data - this would normally come from the database
  const mockListing = {
    id: id || "mock-listing",
    title: "St. Edward's College - Size 8 Blazer",
    description: "Official St. Edward's College blazer in excellent condition. Perfect for the upcoming school year. Barely worn, no stains or damage. Includes school badge and buttons. Perfect fit for age 8-9.",
    price: 35,
    originalPrice: 45,
    condition: "Used - Like New",
    locality: "Sliema",
    schoolName: "St. Edward's College",
    images: [
      "https://picsum.photos/seed/blazer1/600/400",
      "https://picsum.photos/seed/blazer2/600/400",
      "https://picsum.photos/seed/blazer3/600/400"
    ],
    seller: {
      name: "Sarah M.",
      avatar: "https://picsum.photos/seed/sarah/100/100",
      rating: 4.8,
      reviews: 23,
      memberSince: "2023",
      locality: "Sliema"
    },
    postedDate: "2 days ago",
    views: 47,
    category: "School Uniforms",
    size: "Size 8",
    brand: "St. Edward's College Official",
    material: "Wool blend",
    color: "Navy Blue",
    features: [
      "Official school badge included",
      "All buttons present",
      "No stains or damage",
      "Perfect condition",
      "Ready to wear"
    ],
    shipping: {
      pickup: true,
      delivery: true,
      deliveryFee: 5,
      freeDeliveryOver: 30
    },
    returnPolicy: "7 days return policy",
    tags: ["school", "uniform", "blazer", "navy", "official"]
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleContact = () => {
    toast.success("Opening chat with seller...");
  };

  const handleCall = () => {
    toast.success("Calling seller...");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1">
            <Badge variant="secondary" className="mb-2">
              {mockListing.category}
            </Badge>
            <h1 className="text-2xl font-bold text-amber-800">
              {mockListing.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={mockListing.images[0]} 
                    alt={mockListing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 p-4">
                  {mockListing.images.slice(1).map((image, index) => (
                    <div key={index} className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${mockListing.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mockListing.description}
                </p>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Size</span>
                    <p className="font-medium">{mockListing.size}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Brand</span>
                    <p className="font-medium">{mockListing.brand}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Material</span>
                    <p className="font-medium">{mockListing.material}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Color</span>
                    <p className="font-medium">{mockListing.color}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <span className="text-sm font-medium text-muted-foreground mb-2 block">Features</span>
                  <ul className="space-y-1">
                    {mockListing.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mockListing.seller.avatar} />
                    <AvatarFallback>{mockListing.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{mockListing.seller.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{mockListing.seller.rating}</span>
                        <span>({mockListing.seller.reviews} reviews)</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Member since {mockListing.seller.memberSince} • {mockListing.seller.locality}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleContact}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCall}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-amber-800">€{mockListing.price}</span>
                      {mockListing.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          €{mockListing.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      Save €{mockListing.originalPrice - mockListing.price}!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <Euro className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleContact}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Seller
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLike}
                      className={`flex-1 ${isLiked ? 'text-red-500 border-red-500' : ''}`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Liked' : 'Like'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping & Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Pickup available in {mockListing.locality}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Delivery available (€{mockListing.shipping.deliveryFee})</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>{mockListing.returnPolicy}</span>
                </div>
              </CardContent>
            </Card>

            {/* Listing Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Listing Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Posted {mockListing.postedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-primary" />
                  <span>{mockListing.views} views</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{mockListing.locality}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockListing.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
