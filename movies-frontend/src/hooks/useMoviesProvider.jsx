import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { get } from '../services/MoviesApiClient';

export default function useMoviesProvider() {
    const [favoritesPersisted, setFavoritesPersisted, removeFavoritesPersisted] = useLocalStorage('FAVORITES', []);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(favoritesPersisted || []);
    }, [favoritesPersisted]);

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

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    };

    const clearFavorites = () => {
        setFavorites([]);
        removeFavoritesPersisted();
    };

    const userFavorites = async (token) => {
        try {
            const response = await get('listfavorites', {}, token);
            const userFavorites = await response.json();
            
            if (!response.ok) {
                setFavorites(userFavorites);
                setFavoritesPersisted(userFavorites);
            } else {
                setFavorites(userFavorites);
                setFavoritesPersisted(userFavorites);
            }
        } catch (error) {
            console.error('Erro ao buscar favoritos do usuário:', error);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            removeFavoritesPersisted();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [removeFavoritesPersisted]);

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        userFavorites
    };
}