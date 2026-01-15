import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import heroBg from "/hero-bg.jpg";
import HeroSection from '@/components/hero-card'
import { Button } from '@/components/ui/button'
import MovieCard from '@/components/movie-card'

export const Route = createFileRoute('/')({
  component: App,
})


const trendingMovies = [
    { id: 1, title: "Dune: Part Two", year: 2024, rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", genre: "Sci-Fi" },
    { id: 2, title: "Oppenheimer", year: 2023, rating: 8.5, posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", genre: "Drama" },
    { id: 3, title: "The Batman", year: 2022, rating: 7.8, posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop", genre: "Action" },
    { id: 4, title: "Everything Everywhere", year: 2022, rating: 8.0, posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop", genre: "Adventure" },
    { id: 5, title: "Interstellar", year: 2014, rating: 8.7, posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop", genre: "Sci-Fi" },
  ];
  
  const watchlistMovies = [
    { id: 6, title: "Blade Runner 2049", year: 2017, rating: 8.0, posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop", genre: "Sci-Fi", status: "watching" as const },
    { id: 7, title: "The Godfather", year: 1972, rating: 9.2, posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop", genre: "Crime", status: "completed" as const },
    { id: 8, title: "Inception", year: 2010, rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop", genre: "Thriller", status: "plan_to_watch" as const },
  ];

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroBg}
        title="Your Cinema, Your Rules"
        description="Track your favorite movies, build personalized watchlists, and never miss a must-see film again. Join millions of movie enthusiasts in curating the ultimate viewing experience."
        rating={9.2}
        year={2024}
      />

      {/* Trending Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Trending Now</h2>
            <p className="text-muted-foreground mt-1">Popular movies this week</p>
          </div>
          <Link to="/movies">
            <Button variant="ghost" className="gap-2">
              View All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {trendingMovies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
      </section>

      {/* Watchlist Preview */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Your Watchlist</h2>
              <p className="text-muted-foreground mt-1">Continue where you left off</p>
            </div>
            <Link to="/watchlist">
              <Button variant="ghost" className="gap-2">
                Manage Watchlist
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {watchlistMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features to organize your movie-watching journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Watchlists",
              description: "Organize movies by status: watching, completed, or plan to watch. Never lose track again.",
              icon: "📋",
            },
            {
              title: "Personal Ratings",
              description: "Rate and review every film. Build your taste profile and get better recommendations.",
              icon: "⭐",
            },
            {
              title: "Discover New Films",
              description: "Browse curated collections and trending titles. Find your next favorite movie.",
              icon: "🎬",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 CineVault. Built for movie lovers.</p>
        </div>
      </footer>
    </div>
  )
}
