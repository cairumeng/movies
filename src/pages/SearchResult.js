import { Button } from '@material-ui/core'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import MoviesList from '../components/MoviesList'
import useMovies from '../hooks/useMovies'

const SearchResult = () => {
  const { query } = useParams()
  const {
    fetchMovies,
    movies,
    setCurrentPage,
    currentPage,
    totalPages,
    isLoading,
  } = useMovies({
    url: 'search/movie',
    query: {
      query,
    },
  })
  useEffect(() => {
    fetchMovies()
  }, [query, currentPage])

  if (isLoading) return <Loader />

  if (movies.length === 0)
    return (
      <div className="flex flex-col items-center mx-auto">
        <div className="text-lg font-bold">Sorry !</div>
        <div className="mb-6 mt-2">There were no results for movies...</div>

        <Button color="primary" variant="outlined" component={Link} to="/">
          Home
        </Button>
      </div>
    )
  return (
    <>
      <div className="text-xl md:text-3xl bold uppercase">{query}</div>
      <div className="mb-8  text-gray-500 uppercase">search results</div>
      <MoviesList
        movies={movies}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  )
}
export default SearchResult
