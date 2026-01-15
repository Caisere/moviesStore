import { Play, Plus, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";


interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  description: string;
  rating: number;
  year: number;
}

const HeroSection = ({
  backgroundImage,
  title,
  description,
  rating,
  year,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pb-20">
        <div className="max-w-2xl animate-fade-in">
          {/* Meta info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">{rating}</span>
            </div>
            <span className="text-muted-foreground">{year}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Featured</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 line-clamp-3">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/movies">
              <Button variant="default" size="lg" className="gap-3">
                <Play className="w-5 h-5 fill-current" />
                Browse Movies
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-3">
              <Plus className="w-5 h-5" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
