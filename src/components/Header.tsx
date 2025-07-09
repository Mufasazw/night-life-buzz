
import { MapPin, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full pulse-gradient animate-pulse-scale"></div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            Party Pulse
          </h1>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
            <MapPin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
