import React, { useState, useEffect } from 'react';
import { get } from '../../services/MoviesApiClient';
import useAuth from '../../hooks/useAuth';
import useMovies from '../../hooks/useMovies';

import MoviesCard from '../../components/MoviesCard/index';
import InputSearch from '../../components/InputSearch';
import NavMenu from '../../components/NavMenu';
import Snackbar from '../../components/Snackbar';

import './styles.css';

export default function FavoritesDashboard() {
    const { token, userLink } = useAuth();
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { userFavorites } = useMovies();

    async function listOrSearchFavoriteMovies(search) {
        const url = search ? 'searchmovies' : `${userLink}`;

        try {
            const data = await get(url, search ? { search: search } : {}, token);
            const response = await data.json();

            setMovies(response);
            return;
        } catch (error) {
            showError(error.message);
        }
    }

    useEffect(() => {
        listOrSearchFavoriteMovies(search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    return (
        <div>
            <NavMenu />

            <div className="form-search">
                <InputSearch className={search ? 'form-search-typed' : ''} placeholder={'Search movies'} value={search} setValue={setSearch} onChange={() => 'teste'} />
            </div>

            <div className={`container-movies ${movies.length > 0 ? '' : 'hide'}`}>
                {movies.map((movie, index) => (
                    <MoviesCard
                        key={index}
                        movie={movie}
                    />
                ))}
            </div>

            {message && (
                <Snackbar
                    message={message}
                    openSnack={openSnack}
                    setOpenSnack={setOpenSnack}
                />
            )}
        </div>
    );
}