import { api } from "../axios";


type Trending = {
    id: string
    title: string
    rating: number
    releaseYear: number
    posterUrl: string
    genres: Array<string>
    createdBy: string
}

type TrendingResponse = {
    success: string,
    trending: Array<Trending>
}


export async function getTrendingMovies () {
    const response = await api.get<TrendingResponse>('/movies/trending')
    const data = response.data.trending;
    const trendingMovies = data
    return trendingMovies
}