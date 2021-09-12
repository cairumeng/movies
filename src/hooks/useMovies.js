import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const queryToString = (query) => {
  let queries = []
  for (const [key, value] of Object.entries(query)) {
    queries.push(`${key}=${value}`)
  }

  return queries.join('&')
}

const useMovies = ({ url, query = {} }) => {
  const location = useLocation()
  const [movies, setMovies] = useState([])
  const search = new URLSearchParams(location.search)
  const page = Number(search.get('page')) || 1
  const [currentPage, setCurrentPage] = useState(page)
  const [totalPages, setTotalPages] = useState(1)

  const fetchMovies = (page) => {
    window.scroll({ top: 0, behavior: 'smooth' })
    window.history.pushState({}, '', '?page=' + page)

    const queries = queryToString({ ...query, page })
    axios.get(`${url}?${queries}`).then(({ data }) => {
      setMovies(data.results)
      setCurrentPage(page)
      setTotalPages(data.total_pages)
    })
  }

  useEffect(() => {
    fetchMovies(currentPage)
  }, [currentPage])

  return { movies, currentPage, setCurrentPage, totalPages, fetchMovies, page }
}

export default useMovies
