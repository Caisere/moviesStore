import { api } from "../axios";


type Movies = {
    id: string
    title: string
    rating: number
    releaseYear: number
    overview: string
    runtime: number
    posterUrl: string
    genres: Array<string>
    createdBy: string
    createdAt: string
}

type MoviesResponse = {
    success: string,
    movies: Array<Movies>
}


export async function getAllMovies () {
    const response = await api.get<MoviesResponse>('/movies')
    const data = response.data.movies;
    const trendingMovies = data
    return trendingMovies
}