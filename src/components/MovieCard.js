import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Rating from '@material-ui/lab/Rating'

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className="h-52 md:h-80 "
          image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          title={movie.title}
        />
        <CardContent className="flex flex-col items-center">
          <div className=" h-10 line-clamp-2 text-center">{movie.title}</div>
          <Rating name="read-only" value={movie.vote_average / 2} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MovieCard
