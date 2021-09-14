import Pagination from '@material-ui/lab/Pagination'
import MovieCard from './MovieCard'

const MoviesList = ({ movies, setCurrentPage, currentPage, totalPages }) => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6  gap-4 lg:gap-10 2xl:gap-16">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination
          count={totalPages}
          shape="rounded"
          page={currentPage}
          color="primary"
          onChange={(event, page) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}
export default MoviesList
