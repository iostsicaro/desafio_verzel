import { useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function useMoviesProvider() {
    const [moviesPersisted, setMoviesPersisted] = useLocalStorage('MOVIES', []);
    const [favoritesPersisted, setFavoritesPersisted] = useLocalStorage('FAVORITES', []);
    const [movies, setMovies] = useState(moviesPersisted);
    const [favorites, setFavorites] = useState(favoritesPersisted);

    const addMovie = (newMovie) => {
        const updatedMovies = [...movies, newMovie];
        setMovies(updatedMovies);
        setMoviesPersisted(updatedMovies);
    };

    const addFavorite = (movie) => {
        if (!favorites.some(fav => fav.id === movie.id)) {
            const updatedFavorites = [...favorites, movie];
            setFavorites(updatedFavorites);
            setFavoritesPersisted(updatedFavorites);
        }
    };

    const removeFavorite = (movieId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== movieId);
        setFavorites(updatedFavorites);
        setFavoritesPersisted(updatedFavorites);
    };

    return {
        movies,
        favorites,
        addMovie,
        addFavorite,
        removeFavorite,
    };
}