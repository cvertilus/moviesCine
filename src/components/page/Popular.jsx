import React from 'react'
import { useEffect, useState } from 'react'
import { getMoviesEndpoint } from '../../Services/endpoint'
import Hero from '../Hero'
import CarouselPeliculas from './caroulelPeli'


export default function Popular() {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const URL_IMAGE = "https://image.tmdb.org/t/p/original"
    const [moviesData, setData] = useState(null);
    const [first, setFirst] = useState(null);
    const loadMovies = async () => {
        try {
            const movies = await getMoviesEndpoint();
            setData(movies);
        
            if (movies.results && movies.results.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.results.length);
                setFirst(movies.results[randomIndex]);
            }

        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    useEffect(() => {
        loadMovies();
    }, []);
    return (
        <>


            <Hero pelicula={first} />

            {moviesData && (
                <>
                    <CarouselPeliculas ListaPeliculas={moviesData.results} Texto={"Populares"} />

                </>)}


        </>
    )
}
