import axios from 'axios'
import { useState } from 'react'
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
  let page = Number(search.get('page')) || 1
  const [currentPage, setCurrentPage] = useState(page)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setLoading] = useState(false)

  const fetchMovies = () => {
    setLoading(true)
    if (page !== currentPage) {
      page = currentPage
      window.history.pushState({}, '', '?page=' + currentPage)
    }
    let queries = queryToString({ ...query, page: currentPage })
    axios
      .get(`${url}?${queries}`)
      .then(({ data }) => {
        setMovies(data.results)
        setTotalPages(data.total_pages)
      })
      .finally(() => setLoading(false))
  }

  return {
    movies,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchMovies,
    isLoading,
  }
}

export default useMovies
