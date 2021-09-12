import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MoviesList from '../components/MoviesList'

const Discover = () => {
  const { type } = useParams()
  const location = useLocation()
  const [movies, setMovies] = useState([])

  const query = new URLSearchParams(location.search)
  const page = Number(query.get('page')) || 1

  const [currentPage, setCurrentPage] = useState(page)
  const [totalPages, setTotalPages] = useState(1)

  const fetchMovies = (page) => {
    window.scroll({ top: 0, behavior: 'smooth' })
    window.history.pushState({}, '', '?page=' + page)
    axios.get(`/movie/${type}?page=${page}`).then(({ data }) => {
      setMovies(data.results)
      setCurrentPage(page)
      setTotalPages(data.total_pages)
    })
  }

  useEffect(() => {
    fetchMovies(currentPage)
  }, [currentPage])

  return (
    <div>
      <div className="uppercase text-3xl bold mt-5 ">
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
