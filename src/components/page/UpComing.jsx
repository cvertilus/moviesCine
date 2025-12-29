import React, { useState, useEffect } from 'react'
import CarouselPeliculas from './caroulelPeli';
import { getMoviesUpComingEndpoint } from '../../Services/endpoint';
import { Box } from '@mui/material';
import PagePeliculas from './PagePeliculas';



export default function UpComing({ carousel }) {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const URL_IMAGE = "https://image.tmdb.org/t/p/original"
    const [moviesData, setData] = useState(null);
    const [DiseñoCarousel, setDiseñoCarousel] = useState(carousel);
    const loadMovies = async () => {
        try {
            const movies = await getMoviesUpComingEndpoint();
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
                            <CarouselPeliculas ListaPeliculas={moviesData.results} Texto={"Up Coming"} />

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
