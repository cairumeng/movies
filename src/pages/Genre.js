import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MoviesList from '../components/MoviesList'
import useMovies from '../hooks/useMovies'
import OrderSelector from '../components/OrderSelector'
import { orderSlugs } from '../components/OrderSelector'
import Loader from '../components/Loader'

const Genre = () => {
  const { id, name } = useParams()
  const [selectedOrder, setSelectedOrder] = useState(orderSlugs[0])
  const {
    movies,
    setCurrentPage,
    totalPages,
    currentPage,
    fetchMovies,
    isLoading,
  } = useMovies({
    url: `discover/movie`,
    query: {
      with_genres: id,
      sort_by: `${selectedOrder}.desc`,
    },
  })

  useEffect(() => {
    fetchMovies()
    setSelectedOrder(orderSlugs[0])
  }, [id])

  useEffect(() => {
    fetchMovies()
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [selectedOrder, currentPage])

  if (isLoading) return <Loader />

  return (
    <div>
      <div className="uppercase text-xl md:text-3xl bold">{name}</div>
      <div className="mb-8 text-lg text-gray-500">Movies</div>

      <div className="mb-10">
        <OrderSelector
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      </div>
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
