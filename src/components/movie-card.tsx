import { Check, Clock, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  id: string;
  title: string;
  releaseYear: number;
  rating: number;
  posterUrl: string;
  genres: Array<string>;
  status?: "watching" | "completed" | "plan_to_watch" | null;
  onAddToWatchlist?: () => void;
}

const MovieCard = ({
  title,
  releaseYear,
  rating,
  posterUrl,
  genres,
  status,
  onAddToWatchlist,
}: MovieCardProps) => {
  const statusIcons = {
    watching: Clock,
    completed: Check,
    plan_to_watch: Plus,
  };

  const StatusIcon = status ? statusIcons[status] : Plus;

  return (
    <div className="group relative rounded-xl overflow-hidden bg-card shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
      {/* Poster Image */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Action Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full"
            onClick={onAddToWatchlist}
          >
            <StatusIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-sm font-semibold text-foreground">{rating}</span>
        </div>

        {/* Status Badge */}
        {status && (
          <div className={cn(
            "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
            status === "watching" && "bg-blue-500/90 text-white",
            status === "completed" && "bg-green-500/90 text-white",
            status === "plan_to_watch" && "bg-primary/90 text-primary-foreground"
          )}>
            {status === "watching" && "Watching"}
            {status === "completed" && "Completed"}
            {status === "plan_to_watch" && "Plan to Watch"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-muted-foreground">{releaseYear}</span>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {genres.join(' ').split("")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
