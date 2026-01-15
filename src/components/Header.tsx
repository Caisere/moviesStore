import { Link, useLocation } from "@tanstack/react-router"
import { Film, List, LogIn, Search } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils";

// type NavigationLinks = {
//     to: string
//     label: string
// }


// const navigationLinks: Array<NavigationLinks> = [
//     {
//         to: '/',
//         label: 'Home'
//     },
//     {
//         to: '/movies',
//         label: 'Movies'
//     },
//     {
//         to: '/login',
//         label: 'Login'
//     }
// ]



const navLinks = [
  { to: "/", label: "Home", icon: Film },
  { to: "/movies", label: "Browse", icon: Search },
  { to: "/watchlist", label: "Watchlist", icon: List },
];


export default function Header() {
    const location = useLocation();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-glow group-hover:shadow-[0_0_30px_hsl(38_92%_50%_/_0.3)] transition-shadow">
                <Film className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                CineVault
              </span>
            </Link>
  
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link key={link.to} to={link.to}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "gap-2",
                        isActive && "bg-secondary text-primary"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
  
            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
}
