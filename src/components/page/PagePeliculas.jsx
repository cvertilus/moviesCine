import React from 'react'
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function PagePeliculas({ movies }) {

    const IMAGE_BASE = "https://image.tmdb.org/t/p/w400";
    console.log(movies)
    const navigate = useNavigate(); 
    const getMovieDetail = (id) => {
        navigate(`/movieDetail/${id}`);
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 2, md: 4 },
                backgroundColor: "black",
                py:8,
                maxWidth:"100%"
            }}>

                {movies.map((movie) => (

                    <Card
                        onClick={() => getMovieDetail(movie.id)}
                        key={movie.id}
                        sx={{

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
                                aspectRatio: "2/ 3",
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


                ))}

            </Box>

        </>)
}
