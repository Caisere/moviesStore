import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { Bookmark, CheckCircle, Clock } from 'lucide-react';
import MovieCard from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/watchlist')({
  component: RouteComponent,
})

type WatchStatus = "watching" | "completed" | "plan_to_watch";

const watchlistData = [
  { id: 1, title: "Dune: Part Two", year: 2024, rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", genre: "Sci-Fi", status: "watching" as const },
  { id: 2, title: "Oppenheimer", year: 2023, rating: 8.5, posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", genre: "Drama", status: "watching" as const },
  { id: 3, title: "The Batman", year: 2022, rating: 7.8, posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop", genre: "Action", status: "completed" as const },
  { id: 4, title: "Everything Everywhere", year: 2022, rating: 8.0, posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop", genre: "Adventure", status: "completed" as const },
  { id: 5, title: "Interstellar", year: 2014, rating: 8.7, posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop", genre: "Sci-Fi", status: "completed" as const },
  { id: 6, title: "Blade Runner 2049", year: 2017, rating: 8.0, posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop", genre: "Sci-Fi", status: "plan_to_watch" as const },
  { id: 7, title: "The Godfather", year: 1972, rating: 9.2, posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", genre: "Crime", status: "plan_to_watch" as const },
  { id: 8, title: "Inception", year: 2010, rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", genre: "Thriller", status: "plan_to_watch" as const },
  { id: 9, title: "The Dark Knight", year: 2008, rating: 9.0, posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop", genre: "Action", status: "plan_to_watch" as const },
];

const tabs = [
  { id: "all" as const, label: "All", icon: Bookmark },
  { id: "watching" as const, label: "Watching", icon: Clock },
  { id: "completed" as const, label: "Completed", icon: CheckCircle },
  { id: "plan_to_watch" as const, label: "Plan to Watch", icon: Bookmark },
];

function RouteComponent() {
    const [activeTab, setActiveTab] = useState<WatchStatus | "all">("all");

    const filteredMovies = activeTab === "all" 
      ? watchlistData 
      : watchlistData.filter((movie) => movie.status === activeTab);
  
    const stats = {
      watching: watchlistData.filter((m) => m.status === "watching").length,
      completed: watchlistData.filter((m) => m.status === "completed").length,
      plan_to_watch: watchlistData.filter((m) => m.status === "plan_to_watch").length,
      total: watchlistData.length,
    };
  
    return (
      <div className="min-h-screen bg-background">   
        <main className="pt-24 pb-16 container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">My Watchlist</h1>
            <p className="text-muted-foreground">
              {stats.total} movies • {stats.watching} watching • {stats.completed} completed
            </p>
          </div>
  
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Movies", value: stats.total, color: "text-foreground" },
              { label: "Currently Watching", value: stats.watching, color: "text-blue-400" },
              { label: "Completed", value: stats.completed, color: "text-green-400" },
              { label: "Plan to Watch", value: stats.plan_to_watch, color: "text-primary" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-card border border-border">
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className={cn("font-display text-3xl font-bold", stat.color)}>{stat.value}</p>
              </div>
            ))}
          </div>
  
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  variant={isActive ? "default" : "secondary"}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "gap-2 shrink-0",
                    isActive && "shadow-glow"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id !== "all" && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      isActive ? "bg-primary-foreground/20" : "bg-muted"
                    )}>
                      {stats[tab.id]}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
  
          {/* Movie Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie, index) => (
              <div 
                key={movie.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* <MovieCard {...movie} /> */}
              </div>
            ))}
          </div>
  
          {filteredMovies.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No movies in this list
              </h3>
              <p className="text-muted-foreground mb-6">
                Start adding movies to your watchlist
              </p>
              <Button variant="default">Browse Movies</Button>
            </div>
          )}
        </main>
      </div>
    );
}
