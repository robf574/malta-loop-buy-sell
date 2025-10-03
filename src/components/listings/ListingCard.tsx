import { Heart, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  images: string[];
  condition: string;
  locality: string;
  schoolName?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onClick?: () => void;
}

export default function ListingCard({
  title,
  price,
  images,
  condition,
  locality,
  schoolName,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
}: ListingCardProps) {
  return (
    <Card 
      className="overflow-hidden shadow-card hover:shadow-md transition-smooth cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {images && images[0] ? (
          <img 
            src={images[0]} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.();
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-smooth"
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-smooth",
              isFavorite ? "fill-destructive text-destructive" : "text-foreground"
            )}
          />
        </button>

        {/* School badge */}
        {schoolName && (
          <Badge className="absolute bottom-2 left-2 bg-accent text-accent-foreground">
            {schoolName}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2 flex-1">{title}</h3>
          <p className="font-bold text-primary text-sm whitespace-nowrap">€{price.toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-xs">
            {condition}
          </Badge>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{locality}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
