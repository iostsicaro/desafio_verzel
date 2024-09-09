import React, { createContext } from 'react';
import useMoviesProvider from '../hooks/useMoviesProvider';

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
    const movies = useMoviesProvider();

    return (
        <MoviesContext.Provider value={movies}>
            {children}
        </MoviesContext.Provider>
    );
}

export default MoviesContext;