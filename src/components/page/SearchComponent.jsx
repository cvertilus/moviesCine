import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, Container, Grid } from '@mui/material';
import NavBar from '../navBar';

function SearchComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Acceso seguro: Extraemos los resultados
  const moviesData = location.state?.movies?.results || [];

  // Corregido el console.log para evitar errores
  console.log("Datos de movies:", moviesData);

  const IMAGE_BASE = "https://image.tmdb.org/t/p/w400";

  const getMovieDetail = (movieId) => {
    navigate(`/movieDetail/${movieId}`);
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <NavBar />

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h5"
          sx={{ color: "#fff", mb: 4, fontWeight: 700 }}
        >
          Resultados de búsqueda
        </Typography>
       

        {/* 2. Validación: Si no hay resultados */}
        {moviesData.length === 0 ? (
          <Typography sx={{ color: "#aaa", textAlign: 'center', mt: 10 }}>
            No se encontraron películas. Intenta con otro nombre.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {moviesData.map((movie) => (
              // 3. IMPORTANTE: Definir las columnas para que el contenido sea visible
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <Card
                  onClick={() => getMovieDetail(movie.id)}
                  sx={{
                    height: "100%",
                    backgroundColor: "#111",
                    cursor: "pointer",
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      zIndex: 2,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                      "& .overlay-search": { opacity: 1 }
                    },
                  }}
                >
                  {/* Mantenemos la proporción 2:3 del póster */}
                  
                    <CardMedia
                      component="img"
                      // 4. Validación de imagen: Si no hay póster, podrías usar un placeholder
                      image={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "https://via.placeholder.com/400x600?text=Sin+Imagen"}
                      alt={movie.title}
                      sx={{
                       aspectRatio: "2 / 3",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <CardContent
                      className="overlay-search"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
                        // Visible en móvil, oculto en desktop hasta el hover
                        opacity: { xs: 1, md: 0 },
                        transition: "opacity 0.3s ease",
                        p: 1.5
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 700, lineHeight: 1.2 }}
                        noWrap
                      >
                        {movie.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#46d369" }}>
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </Typography>
                    </CardContent>
            
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default SearchComponent;