import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MoviesList from '../components/MoviesList'
import useMovies from '../hooks/useMovies'
const orderSlugs = [
  'popularity',
  'vote_average',
  'original_title',
  'release_date',
]
const Genre = () => {
  const { id, name } = useParams()
  const [selectedOrder, setSelectedOrder] = useState(orderSlugs[0])
  const { movies, setCurrentPage, totalPages, currentPage, fetchMovies, page } =
    useMovies({
      url: `discover/movie`,
      query: {
        with_genres: id,
        sort_by: `${selectedOrder}.desc`,
      },
    })

  useEffect(() => {
    setSelectedOrder(orderSlugs[0])
    fetchMovies(page)
  }, [id])

  useEffect(() => {
    fetchMovies(page)
  }, [selectedOrder])

  return (
    <div>
      <div className="uppercase text-xl mt-8 md:text-3xl md:mt-5 bold">
        {name}
      </div>
      <div className="mb-8 text-lg text-gray-500">Movies</div>

      <div className="mb-10">
        <FormControl variant="outlined">
          <InputLabel>Order</InputLabel>
          <Select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            label="order"
          >
            {orderSlugs.map((slug) => (
              <MenuItem value={slug} className="capitalize">
                {slug.charAt(0).toUpperCase() + slug.replace('_', ' ').slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
