import { useParams } from 'react-router-dom'
import useMovies from '../hooks/useMovies'
import MoviesList from '../components/MoviesList'
import { useEffect } from 'react'

const Discover = () => {
  const { type } = useParams()

  const { movies, setCurrentPage, totalPages, currentPage, fetchMovies, page } =
    useMovies({ url: `/movie/${type}` })

  useEffect(() => {
    fetchMovies(page)
  }, [type])

  return (
    <div>
      <div className="uppercase text-xl mt-8 md:text-3xl md:mt-5 bold">
        {type.replace('_', ' ')}
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
export default Discover
