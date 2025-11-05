

const API_URL = "https://api.themoviedb.org/3"
const API_KEY = "15e8af7864f98b4bc2d7b50f64316d52"


  

export const ENDPOINTS = {
    MOVIE : `${API_URL}/movie/popular?api_key=${API_KEY}&language=es&page=1`,
    DISCOVERY:`${API_URL}/discover/movie?api_key=${API_KEY}&language=es&sort_by=popularity.desc&page=2&with_watch_monetization_types=flatrate&include_adult=false`,
    TOPRATED: `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=es&page=1`,
    UPCOMING: `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=es&page=2`,
   

}

export const getMoviesEndpoint = async () => {
    const response = await fetch(ENDPOINTS.MOVIE);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export const getMoviesDiscoveryEndpoint = async () => {
    const response = await fetch(ENDPOINTS.DISCOVERY);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export const getMoviesTopRatedEndpoint = async () => {
    const response = await fetch(ENDPOINTS.TOPRATED);
    if (!response.ok){
        throw new Error ("Network response was not ok");

    }
    const data = await response.json();
    return data;
}

export const getMoviesUpComingEndpoint = async () => {
    const response = await fetch(ENDPOINTS.UPCOMING);
    if(!response) throw new Error("Network response was not ok")
    const data = await response.json()

    return data
}

export const getMoviesSearchItem = async (nombrePelicula) => {


    const response = await fetch(`${API_URL}/search/movie?query=${nombrePelicula}&api_key=${API_KEY}&language=es`);
    if(!response) throw new Error("Network response was not ok")
        const data =await response.json()
    return data
}

export const getMovieDetail = async (movieId) => {

    const response = await fetch (`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=es`)
    if(!response) throw new Error ("Network response was not ok")
        const data = await response.json()
    return data

}


    