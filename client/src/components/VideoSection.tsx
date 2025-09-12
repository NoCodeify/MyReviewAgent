import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Users, Clock, Star } from "lucide-react";

export default function VideoSection() {
  const handleVideoPlay = () => {
    console.log('Video play triggered');
    // TODO: Remove mock functionality - integrate real video player
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Section Header */}
          <div className="space-y-4">
            <Badge variant="outline" className="text-base px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Case Study Video
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              See How We Closed $2M+ 
              <span className="block text-primary">Using WhatsApp AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch this exclusive case study showing exactly how our clients generated millions 
              in revenue with automated WhatsApp conversations
            </p>
          </div>

          {/* Video Player */}
          <div className="relative group">
            <Card className="relative overflow-hidden rounded-2xl shadow-2xl hover-elevate">
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                {/* Video thumbnail/placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10"></div>
                
                {/* Play button */}
                <Button
                  size="icon"
                  onClick={handleVideoPlay}
                  className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 shadow-2xl relative z-10 transition-transform hover:scale-110"
                  data-testid="button-play-video"
                >
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </Button>

                {/* Video stats overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">12:34</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">15.2K views</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Video highlights */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-chart-1">12min</div>
              <div className="text-muted-foreground">Complete walkthrough</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-chart-1">Real</div>
              <div className="text-muted-foreground">Customer conversations</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-chart-1">$247K</div>
              <div className="text-muted-foreground">Single campaign result</div>
            </div>
          </div>

          {/* CTA below video */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-chart-1 hover:bg-chart-1/90 text-white text-lg px-8 py-6 h-auto"
              data-testid="button-get-access-after-video"
            >
              Yes, I Want This System
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Join 1,247+ businesses already using MyWhatsAgent.ai
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}