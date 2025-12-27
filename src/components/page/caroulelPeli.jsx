import React, { useRef } from 'react';
import { Box, Typography, Card, CardMedia, IconButton, CardContent } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function CarouselPeliculas({ ListaPeliculas, Texto }) {
    const navigate = useNavigate();
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w400"; // W400 para mejor calidad
    const scrollRef = useRef();

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        // Calculamos el ancho de una tarjeta + el gap para un scroll preciso
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: "smooth"
        });
    };

    const getMovieDetail = (movieId) => {
        navigate(`/movieDetail/${movieId}`);
    };

    return (
        <Box sx={{
            p: { xs: 2, md: 4 },
            backgroundColor: "#000",
            position: "relative",
            "&:hover .carousel-button": { opacity: 1 } // Muestra flechas al pasar el mouse
        }}>
            <Typography
                variant="h5"
                sx={{
                    color: "#fff",
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
            >
                {Texto}
            </Typography>

            {/* Flecha Izquierda */}
            <IconButton
                className="carousel-button"
                onClick={() => scroll('prev')}
                sx={{
                    display: { xs: "none", md: "flex" }, // Ocultar en móvil
                    position: "absolute",
                    top: "55%",
                    left: 20,
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
            >
                <ArrowBackIosNew />
            </IconButton>

            {/* Flecha Derecha */}
            <IconButton
                className="carousel-button"
                onClick={() => scroll('next')}
                sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    top: "55%",
                    right: 20,
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
            >
                <ArrowForwardIos />
            </IconButton>

            {/* Contenedor Scrollable */}
            <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    pb: 2, // Espacio para que la sombra del hover no se corte
                    scrollSnapType: "x mandatory", // Efecto imán
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollBehavior: "smooth",
                }}
            >
                {ListaPeliculas.map((movie) => (
                    <Card
                        key={movie.id}
                        onClick={() => getMovieDetail(movie.id)}
                        sx={{
                            minWidth: { xs: 160, sm: 200, md: 220 },
                            maxWidth: { xs: 160, sm: 200, md: 220 },
                            backgroundColor: "#111",
                            cursor: "pointer",
                            position: "relative",
                            borderRadius: 2,
                            scrollSnapAlign: "start",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                                zIndex: 5,
                                "& .overlay": { opacity: 1 }
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={`${IMAGE_BASE}${movie.poster_path}`}
                            alt={movie.title}
                            sx={{
                                height: { xs: 240, md: 320 },
                                objectFit: "cover",
                            }}
                        />

                        {/* Overlay mejorado (visible en hover o móvil) */}
                        <CardContent
                            className="overlay"
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                                opacity: { xs: 1, md: 0 }, // Siempre visible en móvil
                                transition: "opacity 0.3s",
                                p: 1.5
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700 }} noWrap>
                                {movie.title}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                <Typography variant="caption" sx={{ color: "var(--Primary)", fontWeight: 600 }}>
                                    {movie.release_date?.split('-')[0]}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#ccc" }}>
                                    ⭐ {movie.vote_average?.toFixed(1)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default CarouselPeliculas;