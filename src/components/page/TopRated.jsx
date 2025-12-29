import React from 'react'
import { useState, useEffect } from "react"
import { getMoviesTopRatedEndpoint } from '../../Services/endpoint'
import CarouselPeliculas from './caroulelPeli'
import PagePeliculas from './PagePeliculas'

export default function TopRated({ carousel }) {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const URL_IMAGE = "https://image.tmdb.org/t/p/original"
    const [moviesData, setData] = useState(null);
    const [DiseñoCarousel, setDiseñoCarousel] = useState(carousel);
    const loadMovies = async () => {
        try {
            const movies = await getMoviesTopRatedEndpoint();
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
                            <CarouselPeliculas ListaPeliculas={moviesData.results} Texto={"Top Rated"} />

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
