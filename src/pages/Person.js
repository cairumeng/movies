import { Button } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import MovieIcon from '@material-ui/icons/Movie'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import MoviesList from '../components/MoviesList'
import OrderSelector from '../components/OrderSelector'
import { orderSlugs } from '../components/OrderSelector'
import useMovies from '../hooks/useMovies'

const Person = () => {
  const { id } = useParams()
  const history = useHistory()
  const [person, setPerson] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(orderSlugs[0])
  const el = useRef()

  const { movies, setCurrentPage, totalPages, currentPage, fetchMovies } =
    useMovies({
      url: '/discover/movie',
      query: {
        with_cast: id,
        sort_by: `${selectedOrder}.desc`,
      },
    })

  useEffect(() => {
    axios.get(`/person/${id}`).then((response) => setPerson(response.data))
    setSelectedOrder(orderSlugs[0])
  }, [id])

  useEffect(() => {
    window.scroll({
      top: window.pageYOffset + el.current?.getBoundingClientRect().top,
      behavior: 'smooth',
    })
    fetchMovies(currentPage)
  }, [selectedOrder, currentPage])

  if (!person) return <Loader />

  return (
    <>
      <ArrowBack
        color="primary"
        className="cursor-pointer mt-2"
        onClick={() => {
          history.goBack()
        }}
      />

      <div className="grid sm:grid-cols-1 lg:grid-cols-3 lg:p-28 gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w780${person.profile_path}`}
          className="w-full col-span-2 lg:col-span-1"
        />
        <div className="col-span-2">
          <div className="text-3xl uppercase">{person.name}</div>
          <div>{person.birthday}</div>

          <div className="mt-8">
            <div className="font-bold">THE BIOGRAPHY</div>
            <div className="font-light mt-2">{person.biography}</div>
          </div>

          <div className="mt-8 flex">
            {person.imdb_id && (
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: '10px', marginBottom: '10px' }}
                target="_blank"
                href={`https://www.imdb.com/name/${person.imdb_id}`}
              >
                <span className="mr-1">IMDB</span> <MovieIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
      {movies.length > 0 && (
        <div ref={el}>
          <div className="text-xl mt-8 md:text-3xl md:mt-5 bold">
            ALSO ENTERS IN
          </div>
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
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  )
}
export default Person
