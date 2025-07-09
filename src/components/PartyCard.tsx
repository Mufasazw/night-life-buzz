
import { MapPin, Users, Instagram, Heart, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VibeMeter from "./VibeMeter";

interface PartyCardProps {
  rank: number;
  name: string;
  location: string;
  image: string;
  vibeScore: number;
  attendees: number;
  socialStats: {
    posts: number;
    likes: number;
    comments: number;
  };
  tags: string[];
  distance: string;
}

const PartyCard = ({ 
  rank, 
  name, 
  location, 
  image, 
  vibeScore, 
  attendees, 
  socialStats, 
  tags, 
  distance 
}: PartyCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-card/50 backdrop-blur border-border/40 hover:bg-card/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Rank Badge */}
      <div className="absolute top-3 left-3 z-20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
          <span className="text-sm font-bold text-white">#{rank}</span>
        </div>
      </div>

      {/* Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Social Stats Overlay */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <div className="flex items-center space-x-1 bg-black/60 rounded-full px-2 py-1">
            <Instagram className="h-3 w-3 text-neon-pink" />
            <span className="text-xs text-white font-medium">{socialStats.posts}</span>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center space-x-1 bg-red-500 rounded-full px-2 py-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs text-white font-medium">LIVE</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground mb-1">{name}</h3>
          <div className="flex items-center text-muted-foreground text-sm space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
            <span>•</span>
            <span>{distance}</span>
          </div>
        </div>

        {/* Vibe Score */}
        <VibeMeter score={vibeScore} size="md" />

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{attendees}+ here</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3 text-red-500" />
                <span>{socialStats.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3 text-blue-500" />
                <span>{socialStats.comments}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-accent/20 text-accent border-accent/30"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PartyCard;
