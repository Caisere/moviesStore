import { useQuery } from '@tanstack/react-query'
import { getTrendingMovies } from '@/lib/movies/getTrendingMovies'



export function useTrendingMovies() {

    const { data: trendingMovies, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: getTrendingMovies
    })

    return { trendingMovies, isPending }
}
