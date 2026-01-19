import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Grid, List, Search } from 'lucide-react';
import { useState } from 'react';
import MovieCard from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTrendingMovies } from '@/lib/movies/getTrendingMovies';
import { getAllMovies } from '@/lib/movies/getAllMovies';

export const Route = createFileRoute('/movies')({
    loader: async () => {
        const [trendingMovies, movies] = await Promise.all([getTrendingMovies(), getAllMovies()])
        return {trendingMovies, movies}
    },
    component: RouteComponent,

})

const genres = ["All", "Sci-Fi", "Drama", "Action", "Adventure", "Crime", "Thriller"];

function RouteComponent() {
    const {trendingMovies, movies: watchlistMovies} = useLoaderData({from: '/movies'})

    const allMovies =[...trendingMovies, ...watchlistMovies]

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredMovies = allMovies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre === "All" || movie.genres.includes(selectedGenre);
        return matchesSearch && matchesGenre;
    });

    return (
      <div className="min-h-screen bg-background">        
        <main className="pt-24 pb-16 container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Browse Movies</h1>
            <p className="text-muted-foreground">Discover your next favorite film</p>
          </div>
  
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border h-12"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="flex gap-1 p-1 bg-secondary rounded-lg">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedGenre(genre)}
                    className="text-xs md:text-sm"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-1 p-1 bg-secondary rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
  
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-semibold">{filteredMovies.length}</span> movies
            </p>
          </div>
  
          {/* Movie Grid */}
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
              : "flex flex-col gap-4"
          }>
            {filteredMovies.map((movie, index) => (
              <div 
                key={movie.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
  
          {filteredMovies.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No movies found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>
    )
}
