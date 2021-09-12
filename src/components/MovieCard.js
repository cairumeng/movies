import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className="h-52 md:h-80 "
          image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          title={movie.title}
        />
        <CardContent>
          <div className="text-center h-10 line-clamp-2">{movie.title}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MovieCard
