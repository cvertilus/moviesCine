import React, { useState, useEffect } from 'react'
import CarouselPeliculas from './caroulelPeli';
import { getMoviesUpComingEndpoint } from '../../Services/endpoint';



export default function UpComing() {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const URL_IMAGE = "https://image.tmdb.org/t/p/original"
    const [moviesData, setData] = useState(null);
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
                    <CarouselPeliculas ListaPeliculas={moviesData.results} Texto={"UpComing"} />

                </>)}
        </>
    )
}
