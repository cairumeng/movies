import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MoviesList from '../components/MoviesList'
import useMovies from '../hooks/useMovies'

const Genre = () => {
  const { id, name } = useParams()
  const { movies, setCurrentPage, totalPages, currentPage, fetchMovies, page } =
    useMovies({
      url: `discover/movie`,
      query: {
        with_genres: id,
        sort_by: 'popularity.desc',
      },
    })
  useEffect(() => {
    fetchMovies(page)
  }, [id])

  return (
    <div>
      <div className="uppercase text-xl mt-8 md:text-3xl md:mt-5 bold">
        {name}
      </div>
      <div className="mb-8 text-lg text-gray-500">Movies</div>
      <MoviesList
        movies={movies}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}
export default Genre
