import React, { use } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Card, CardMedia, Button, Stack, IconButton,CardContent } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRef } from 'react';
import "/src/styles/Styles.css"

import { useNavigate } from 'react-router-dom';

function CarouselPeliculas({ ListaPeliculas,Texto }) {
    const navigate = useNavigate()
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

    const scrollRef = useRef();
    const cardRef = useRef();

    const handleNext = () => {
        const container = scrollRef.current;
        const card = cardRef.current;
        if (!container || !card) return;
      
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        const currentScroll = container.scrollLeft;
      
        const maxScrollLeft = scrollWidth - containerWidth;
        const nextScrollLeft = currentScroll + containerWidth;
      
        if (currentScroll >= maxScrollLeft - 5) {
          // Volver al inicio si ya estamos al final
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll normal
          container.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
        }
      };

    const handlePrev = () => {
        const container = scrollRef.current;
        const containerWidth = container.clientWidth;
        let prevScrollLeft = container.scrollLeft - containerWidth;
        if (prevScrollLeft < 0) prevScrollLeft = 0;
        container.scrollTo({ left: prevScrollLeft, behavior: "smooth" });
    };

    const getMovieDetail = (movieId) => {
        navigate(`/movieDetail/${movieId}`)

    }
   


    return (
        <Box sx={{ p: 2, backgroundColor: "#000", position:"relative", pt:10}}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                {Texto}
            </Typography>

            {/* Botones de navegación */}
            <IconButton
                onClick={handlePrev}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 12,
                    transform: "translateY(-50%)",
                    zIndex: 9999,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                }}
            >
                <ArrowBackIos />
            </IconButton>

            <IconButton
                onClick={handleNext}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 12,
                    transform: "translateY(-50%)",
                    zIndex: 9999,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.4) ",
                    "&:hover": { backgroundColor: "rgba(0,0,0,1)" },
                }}
            >
                <ArrowForwardIos />
            </IconButton>

            {/* Contenedor scrollable */}
            <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap	: 1,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    width: ListaPeliculas.length > 1 ? "100%" : "auto",
                }}
            >
                {ListaPeliculas.map((movie, index) => (
                    <Card
                        className='card'
                        key={movie.id}
                        onClick={() => getMovieDetail(movie.id)}
                        ref={index === 0 ? cardRef : null}
                        sx={{
                            minWidth: 180,
                            flex: "auto",
                            backgroundColor: "#111",
                            transition: "transform 0.3s",
                            padding: 0,
                            position: "relative",
                            
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={`${IMAGE_BASE}${movie.poster_path}`}
                            alt={movie.title}
                            sx={{
                                height: 250,
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
        </Box>
    )
}

CarouselPeliculas.propTypes = {}

export default CarouselPeliculas
