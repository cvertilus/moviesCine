export class Movie {
    
    constructor(id, title, description, releaseDate, genre, director, cast, duration, rating, posterUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.director = director;
        this.cast = cast; // Array of actors
        this.duration = duration; // in minutes
        this.rating = rating; // e.g., IMDb rating
        this.posterUrl = posterUrl; // URL to the movie poster image
    }
}