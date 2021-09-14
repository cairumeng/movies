import { Avatar, Button } from '@material-ui/core'
import LensOutlined from '@material-ui/icons/LensOutlined'
import LinkIcon from '@material-ui/icons/Link'
import MovieIcon from '@material-ui/icons/Movie'
import PlayArrow from '@material-ui/icons/PlayArrow'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { AvatarGroup } from '@material-ui/lab'
import Rating from '@material-ui/lab/Rating'
import ModalVideo from 'react-modal-video'
import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import castDefaultImg from './assets/person.svg'
import useMovies from '../hooks/useMovies'
import MoviesList from '../components/MoviesList'

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const history = useHistory()
  const {
    movies: recommandedMovies,
    currentPage: recommandedCurrentPage,
    setCurrentPage: setRecommandedCurrentPage,
    totalPages: recommandedTotalPages,
    fetchMovies: fetchRecommandedMovies,
    page,
  } = useMovies({
    url: `/movie/${id}/recommendations`,
  })

  const [cast, setCast] = useState(null)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    axios
      .get(`/movie/${id}?append_to_response=videos`)
      .then((response) => setMovie(response.data))

    axios
      .get(`/movie/${id}/credits`)
      .then((response) => setCast(response.data.cast))

    fetchRecommandedMovies(1)
  }, [id])

  if (movie === null || cast === null) return 'loading'

  return (
    <>
      <div className="mt-8 mb-2" onClick={() => history.push('/')}>
        <ArrowBack color="primary" />
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 lg:p-28 gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
          className="w-full col-span-2 lg:col-span-1"
        />
        <div className="col-span-2">
          <div className="text-3xl uppercase">{movie.title}</div>
          <div>{movie.tagline}</div>
          <div className="flex justify-between text-indigo-500 font-bold mt-5">
            <Rating name="read-only" value={movie.vote_average / 2} readOnly />
            <div>
              {movie.spoken_languages[0].name} /{movie.runtime}MIN/
              {movie.release_date.split('-')[0]}
            </div>
          </div>
          <div className="mt-10">
            <div className="font-bold">THE GENRES</div>
            <div className="flex mt-2 flex-wrap">
              {movie.genres.map((genre) => (
                <div className="mr-5" key={genre.id}>
                  <LensOutlined style={{ fontSize: 10 }} color="primary" />
                  <span className="text-indigo-500 font-bold ml-2">
                    {genre.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="font-bold">THE SYNOPSIS</div>
            <div className="font-light mt-2">{movie.overview}</div>
          </div>
          <div className="mt-8">
            <div className="font-bold mb-2">THE CASTING</div>
            <AvatarGroup max={10}>
              {cast.map((person) => (
                <Link to={`/persons/${person.id}`} key={person.id}>
                  <Avatar
                    alt={person.name}
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : `${castDefaultImg}`
                    }
                  />
                </Link>
              ))}
            </AvatarGroup>
          </div>
          <div className="mt-8 flex">
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: '10px', marginBottom: '10px' }}
              href={movie.homepage}
            >
              <span className="mr-1">Website</span>
              <LinkIcon />
            </Button>
            {movie.imdb_id && (
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: '10px', marginBottom: '10px' }}
                href={movie.homepage}
              >
                <span className="mr-1">IMDB</span> <MovieIcon />
              </Button>
            )}
            {movie.videos?.results.length > 0 && (
              <div>
                <ModalVideo
                  channel="youtube"
                  autoplay
                  isOpen={isOpen}
                  videoId={movie.videos?.results[0]?.key}
                  onClose={() => setOpen(false)}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  <span className="mr-1">Trailer</span> <PlayArrow />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="text-xl mt-8 md:text-3xl md:mt-5 bold">RECOMMANDED</div>
        <div className="mb-8 text-lg text-gray-500">Movies</div>
        <MoviesList
          movies={recommandedMovies}
          setCurrentPage={setRecommandedCurrentPage}
          currentPage={recommandedCurrentPage}
          totalPages={recommandedTotalPages}
        />
      </div>
    </>
  )
}
export default Movie
