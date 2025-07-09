
import Header from "@/components/Header";
import LocationSelector from "@/components/LocationSelector";
import TrendingSection from "@/components/TrendingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LocationSelector />
      
      <main className="pb-20">
        <TrendingSection />
      </main>
      
      {/* Bottom gradient for mobile feel */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
