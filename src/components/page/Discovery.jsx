import React from 'react'
import { useEffect, useState } from 'react'
import { getMoviesDiscoveryEndpoint } from '../../Services/endpoint'
import CarouselPeliculas from './caroulelPeli'
import { Box, Typography, Card, CardMedia, CardContent, Container, Grid } from '@mui/material';
import PagePeliculas from './PagePeliculas';


export default function Discovery({carousel}) {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const URL_IMAGE = "https://image.tmdb.org/t/p/original"
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w400";
    const [moviesData, setData] = useState(null);
    const [DiseñoCarousel, setDiseñoCarousel] = useState(carousel);

    const loadMovies = async () => {
        try {
            const movies = await getMoviesDiscoveryEndpoint();
            setData(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    useEffect(() => {
        loadMovies();
    }, []);
    return (
        <>
             {moviesData && (
                <>
                    {DiseñoCarousel ? (
                        <>
                            <CarouselPeliculas ListaPeliculas={moviesData.results} Texto={"Discovery"} />

                        </>) :
                        (
                            <>
                                <PagePeliculas movies={moviesData.results} />
                            </>
                        )}
                </>

            ) }
        </>
    )
}
