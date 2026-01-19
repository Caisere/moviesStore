import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import HeroSection from '@/components/hero-card'
import { Button } from '@/components/ui/button'
import MovieCard from '@/components/movie-card'
import { getTrendingMovies } from '@/lib/movies/getTrendingMovies';
import { getAllMovies } from '@/lib/movies/getAllMovies';

export const Route = createFileRoute('/')({
    loader: async () => {
        const [trendingMovies, movies] = await Promise.all([getTrendingMovies(), getAllMovies()])
        return {trendingMovies, movies}
    },
    component: App,
})

function App() {
    const {trendingMovies, movies:watchlistMovies} = useLoaderData({from: '/'})


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection/>

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
              <h2 className="font-display text-3xl font-bold text-foreground">All Movies</h2>
              <p className="text-muted-foreground mt-1">Continue where you left off</p>
            </div>
            <Link to="/watchlist">
              <Button variant="ghost" className="gap-2">
                Explore our Movies Collection
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
          <p>© {new Date().getFullYear()} CineVault. Built for movie lovers.</p>
        </div>
      </footer>
    </div>
  )
}
