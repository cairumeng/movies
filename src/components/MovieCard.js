import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Rating from '@material-ui/lab/Rating'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import DefaultMoviePoster from '../assets/nothing.svg'

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#3f51b5',
    borderRadius: theme.spacing(1),
    opacity: '0.5',
  },
}))

const MovieCard = ({ movie }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Link
      className="transition duration-300 ease-in-out transform hover:-translate-y hover:scale-110 hover:shadow-md"
      to={`/movies/${movie.id}?page=1`}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            className="h-52 md:h-64"
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : DefaultMoviePoster
            }
            title={movie.title}
          />
          <CardContent className="flex flex-col items-center">
            <div className=" h-10 line-clamp-2 text-center">{movie.title}</div>
            <div
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <Rating
                name="read-only"
                value={movie.vote_average / 2}
                readOnly
              />
            </div>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <div className="text-white text-center">
                <div>{`${movie.vote_average / 2} rating`}</div>
                <div>{`on ${movie.vote_count} votes`}</div>
              </div>
            </Popover>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default MovieCard
