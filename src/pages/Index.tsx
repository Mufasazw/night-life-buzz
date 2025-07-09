
import Header from "@/components/Header";
import LocationSelector from "@/components/LocationSelector";
import TrendingSection from "@/components/TrendingSection";
import ScrapedPosts from "@/components/ScrapedPosts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LocationSelector />
      
      <main className="pb-20 px-4 max-w-4xl mx-auto">
        <TrendingSection />
        
        <div className="mt-8">
          <ScrapedPosts location="New York, NY" />
        </div>
      </main>
      
      {/* Bottom gradient for mobile feel */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
