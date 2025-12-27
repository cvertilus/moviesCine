import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetail } from '../../Services/endpoint'
import { Box, Typography, Button, Stack, Chip, CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NavBar from '../navBar'

export default function MovieRepresentation() {
  const IMAGE_BASE_ORIGINAL = "https://image.tmdb.org/t/p/original"
  const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500"

  const navigate = useNavigate()
  const params = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadMovieDetail = async () => {
    try {
      setLoading(true)
      const data = await getMovieDetail(params.id)
      setMovie(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovieDetail()
  }, [params.id])

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
      <CircularProgress color="primary" />
    </Box>
  )

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <NavBar />

      {movie && (
        <Box sx={{ position: 'relative', width: '100%', minHeight: '90vh' }}>

          {/* BACKGROUND IMAGE CON DEGRADADO */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${IMAGE_BASE_ORIGINAL}${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              zIndex: 1,
              display: { xs: 'none', md: 'block' } // Solo en escritorio
            }}
          />

          {/* CONTENIDO PRINCIPAL */}
          <Box sx={{
            position: 'relative',
            zIndex: 2,
            pt: { xs: 2, md: 10 },
            px: { xs: 2, md: 8 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 4
          }}>

            {/* POSTER */}
            <Box
              component="img"
              src={`${IMAGE_BASE_W500}${movie.poster_path}`}
              alt={movie.title}
              sx={{
                width: { xs: '200px', sm: '280px', md: '350px' },
                borderRadius: 2,
                boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />

            {/* INFORMACIÓN */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h2" sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3.5rem' },
                mb: 1,
                textShadow: '2px 2px 10px rgba(0,0,0,0.8)'
              }}>
                {movie.title}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                alignItems="center"
                sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
              >
                <Typography sx={{ color: '#46d369', fontWeight: 'bold' }}>
                  {Math.round(movie.vote_average * 10)}% para ti
                </Typography>
                <Typography>{movie.release_date?.split('-')[0]}</Typography>
                <Chip label={`${movie.runtime} min`} size="small" sx={{ color: '#fff', border: '1px solid #777' }} />
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{ mb: 3, flexWrap: 'wrap' }}
              >
                {movie.genres?.map(g => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    size="small"
                    sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ccc' }}
                  />
                ))}
              </Stack>

              <Typography variant="body1" sx={{
                maxWidth: '700px',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: '#ddd',
                mb: 4,
                display: { xs: '-webkit-box', md: 'block' },
                overflow: 'hidden',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical'
              }}>
                {movie.overview}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => navigate(`/verPelicula/${params?.id}`)}
                  sx={{
                    backgroundColor: '#fff',
                    px: 4,
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'green' }
                  }}
                >
                  Ver ahora
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<YouTubeIcon />}
                  onClick={() => window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, '_blank')}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: '#fff',
                    px: 4,
                    '&:hover': { borderColor: 'blue', backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Trailer
                </Button>
              </Stack>
            </Box>
          </Box>

          {/* EFECTO DE DIFUMINADO INFERIOR */}
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(to top, #000, transparent)',
            zIndex: 1
          }} />
        </Box>
      )}
    </Box>
  )
}