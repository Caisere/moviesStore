import { createFileRoute } from '@tanstack/react-router'
import { Grid, List, Search } from 'lucide-react';
import { useState } from 'react';
import MovieCard from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/movies')({
    component: RouteComponent,
})


const allMovies = [
    { id: 1, title: "Dune: Part Two", year: 2024, rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", genre: "Sci-Fi" },
    { id: 2, title: "Oppenheimer", year: 2023, rating: 8.5, posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", genre: "Drama" },
    { id: 3, title: "The Batman", year: 2022, rating: 7.8, posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop", genre: "Action" },
    { id: 4, title: "Everything Everywhere", year: 2022, rating: 8.0, posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop", genre: "Adventure" },
    { id: 5, title: "Interstellar", year: 2014, rating: 8.7, posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop", genre: "Sci-Fi" },
    { id: 6, title: "Blade Runner 2049", year: 2017, rating: 8.0, posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop", genre: "Sci-Fi" },
    { id: 7, title: "The Godfather", year: 1972, rating: 9.2, posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", genre: "Crime" },
    { id: 8, title: "Inception", year: 2010, rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", genre: "Thriller" },
    { id: 9, title: "The Dark Knight", year: 2008, rating: 9.0, posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop", genre: "Action" },
    { id: 10, title: "Pulp Fiction", year: 1994, rating: 8.9, posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop", genre: "Crime" },
    { id: 11, title: "Fight Club", year: 1999, rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop", genre: "Drama" },
    { id: 12, title: "The Matrix", year: 1999, rating: 8.7, posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop", genre: "Sci-Fi" },
];
  
  const genres = ["All", "Sci-Fi", "Drama", "Action", "Adventure", "Crime", "Thriller"];
  

function RouteComponent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
    const filteredMovies = allMovies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
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
