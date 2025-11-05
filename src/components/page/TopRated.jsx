import React from 'react'
import {useState,useEffect} from "react"
import { getMoviesTopRatedEndpoint } from '../../Services/endpoint'
import CarouselPeliculas from './caroulelPeli'

export default function TopRated() {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const URL_IMAGE = "https://image.tmdb.org/t/p/original"
    const [moviesData, setData] = useState(null);
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
                    <CarouselPeliculas ListaPeliculas={moviesData.results} Texto={"Top Rated"} />

                </>)}

    </>
  )
}
