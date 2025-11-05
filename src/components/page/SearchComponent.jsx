import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import NavBar from '../navBar';
import { useNavigate } from 'react-router-dom';




function SearchComponent() {
  const location = useLocation();
  const movies = location.state.movies || [];
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";
  const navigate = useNavigate()

  const getMovieDetail = (movieId) => {
    navigate(`/movieDetail/${movieId}`)

}

  return (
    <>
      <NavBar />

      <Box
        sx={{
          display: "flex",
          flexDirection:"row",
          alignItems:"flex-start",
          flexWrap:"wrap",
          overflow: "hidden",
          gap: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          height:"100%"
        
        }}
      >
        {movies.results.map((movie, index) => (
          <Card
            className='card'
            onClick={() => getMovieDetail(movie.id)}
          
            key={movie.id}
           
            sx={{
              minWidth:"200px",
              height:"auto",
              position:"relative",
           
              backgroundColor: "#111",
              transition: "transform 0.3s",
    
            }}
          >
            <CardMedia
              component="img"
              image={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              sx={{
                objectFit: "cover",
              }}
            />
            <CardContent className='overlay'>
              <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: "bold" }}>
                Title : {movie.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ccc" }}>
                Date:  {movie.release_date}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ccc", mt: 1 }}>
                view: {movie.vote_count}
              </Typography>
            </CardContent>

          </Card>
        ))}
      </Box>



    </>

  )
}

SearchComponent.propTypes = {}

export default SearchComponent
