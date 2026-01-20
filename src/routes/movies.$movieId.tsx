import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { getMoviesById } from '@/lib/movies/getAllMovies'

export const Route = createFileRoute('/movies/$movieId')({
    validateSearch: () => {},
    component: RouteComponent,
    loader: async({params}) => {
        const movie = await getMoviesById(params.movieId)
        console.log(movie)
        return movie
    },
    pendingComponent: () => <h1 className='text-4xl font-bold mt-20'>Loading...</h1>,
    errorComponent: () => <p>Movie Not Found</p>
})

function RouteComponent() {
    const movie = useLoaderData({from: '/movies/$movieId'})
    console.log(movie)
  return <div className='mt-30'>Hello "/movies/$movieId"!</div>
}
