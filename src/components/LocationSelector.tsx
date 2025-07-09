
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSelector = () => {
  return (
    <div className="px-4 py-3 border-b border-border/40">
      <Button 
        variant="ghost" 
        className="w-full justify-between h-auto p-3 text-left hover:bg-card/50"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-accent/20">
            <MapPin className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="font-medium text-foreground">Downtown Miami</div>
            <div className="text-sm text-muted-foreground">Within 10km radius</div>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
};

export default LocationSelector;
