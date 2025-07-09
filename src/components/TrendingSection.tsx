
import { TrendingUp, Clock } from "lucide-react";
import PartyCard from "./PartyCard";

const TrendingSection = () => {
  // Mock data for demonstration
  const hotSpots = [
    {
      rank: 1,
      name: "LIV Miami",
      location: "Fontainebleau Hotel",
      image: "/placeholder.svg",
      vibeScore: 95,
      attendees: 450,
      distance: "2.1 km",
      socialStats: {
        posts: 127,
        likes: 2340,
        comments: 156
      },
      tags: ["House", "VIP", "Celebrity DJ"]
    },
    {
      rank: 2,
      name: "E11EVEN",
      location: "Downtown Miami",
      image: "/placeholder.svg",
      vibeScore: 88,
      attendees: 380,
      distance: "1.5 km",
      socialStats: {
        posts: 89,
        likes: 1890,
        comments: 134
      },
      tags: ["24/7", "Strip Club", "Hip Hop"]
    },
    {
      rank: 3,
      name: "Story Rooftop",
      location: "South Beach",
      image: "/placeholder.svg",
      vibeScore: 82,
      attendees: 320,
      distance: "3.2 km",
      socialStats: {
        posts: 73,
        likes: 1456,
        comments: 98
      },
      tags: ["Rooftop", "Ocean View", "EDM"]
    },
    {
      rank: 4,
      name: "SPACE",
      location: "Downtown Miami",
      image: "/placeholder.svg",
      vibeScore: 79,
      attendees: 280,
      distance: "1.8 km",
      socialStats: {
        posts: 61,
        likes: 1234,
        comments: 87
      },
      tags: ["Techno", "Underground", "All Night"]
    },
    {
      rank: 5,
      name: "Rockwell",
      location: "South Beach",
      image: "/placeholder.svg",
      vibeScore: 75,
      attendees: 250,
      distance: "2.8 km",
      socialStats: {
        posts: 45,
        likes: 967,
        comments: 65
      },
      tags: ["Intimate", "Cocktails", "Live Music"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-neon-pink" />
          <h2 className="text-xl font-bold text-foreground">Tonight's Hottest</h2>
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Updated 2 min ago</span>
        </div>
      </div>

      {/* Party Cards */}
      <div className="px-4 space-y-4">
        {hotSpots.map((spot) => (
          <PartyCard key={spot.rank} {...spot} />
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 pb-8">
        <button className="w-full py-3 border border-border/40 rounded-lg text-muted-foreground hover:bg-card/30 transition-colors">
          View More Parties
        </button>
      </div>
    </div>
  );
};

export default TrendingSection;
