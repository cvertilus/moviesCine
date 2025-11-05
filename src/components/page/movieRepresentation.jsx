import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetail } from '../../Services/endpoint'
import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import NavBar from '../navBar'


export default function MovieRepresentation() {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original"
  const navigate = useNavigate()

  const params = useParams()
  const iframeUrl = `https://vidsrc.xyz/embed/movie?tmdb=${params?.id}&ds_lang=es`;
  const [movie, setMovie] = useState(null)
  const [mostrarIframe, setMostrarIframe] = useState(false);
  const loadMovieDetail = async () => {
    try {
      const data = await getMovieDetail(params.id)

      console.log(data)
      setMovie(data)
      console.log(movie)
    }

    catch (error) {
      console.error('Error fetching movies:', error);

    }

  }

  useEffect(() => {
    loadMovieDetail();


  }, [])


  const verPelicula = () => {
    navigate(`/verPelicula/${params?.id}`);

  }
 

  return (

    <>
      <NavBar></NavBar>
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#121212',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}>
        {movie && (
          <Card
            sx={{
              minWidth: 200,
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexDirection: {
                xs: 'column',   // en pantallas extra pequeñas (xs), vertical
                sm: 'row',      // en sm en adelante, horizontal
              },
              position: "absolute",



            }}


          >
            <CardMedia
              component="img"
              image={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              sx={{
                height: "400px",
                paddingBottom: 1,
                width: {
                  xs: "100%",
                  sm: "50%"
                },
                objectFit: "contain",

              }}
            />
            <Box>

              <CardContent>
                <Typography variant="h4" component="div" color="warning" gutterBottom>
                  {movie.title}
                </Typography>

                <Typography variant="subtitle1" color="primary">
                  Estreno: {movie.release_date}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Duración: {movie.runtime} min
                </Typography>

                <Typography variant="body1" mt={2}>
                  {movie.overview}
                </Typography>

                <Typography variant="body2" mt={2} color="blue">
                  Calificación: ⭐ {movie.vote_average} ({movie.vote_count} votos)
                </Typography>
                {movie.genres && movie.genres.length > 0 && (
                  <Typography variant="body2" color="success" mt={1}>
                    GENEROS: {movie.genres.map(g => g.name).join(', ')}
                  </Typography>
                )}

              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-Start', px: 2, pb: 2 }}>
                <Button variant="contained" color="success"
                  onClick={verPelicula}
                  sx={{
                    mt: 1,
                    px: 4,
                    py: 1.2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'none',


                  }}>
                  ▶️ Play
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mt: 1,
                    px: 4,
                    py: 1.2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'none',

                  }}
                  onClick={() => window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, '_blank')}

                >
                  🎬 Ver Trailer
                </Button>
              </CardActions>
            </Box>

          </Card>
        )}
       

      </Box >


    </>
  )
}

MovieRepresentation.propTypes = {



}


