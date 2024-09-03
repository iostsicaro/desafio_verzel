import { useContext } from 'react';
import MoviesContext from '../context/MoviesContext';

export default function useMovies() {
    return useContext(MoviesContext);
}