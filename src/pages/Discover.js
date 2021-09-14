import { useParams } from 'react-router-dom'
import useMovies from '../hooks/useMovies'
import MoviesList from '../components/MoviesList'
import { useEffect } from 'react'
import Loader from '../components/Loader'

const Discover = () => {
  const { type } = useParams()

  const {
    movies,
    setCurrentPage,
    totalPages,
    currentPage,
    fetchMovies,
    isLoading,
  } = useMovies({ url: `/movie/${type}` })

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    fetchMovies(currentPage)
  }, [type, currentPage])

  if (isLoading) return <Loader />

  return (
    <div>
      <div className="uppercase text-xl md:text-3xl bold">
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
