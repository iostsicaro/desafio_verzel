import React, { useState, useEffect } from 'react';
import { get } from '../../services/MoviesApiClient';
import useAuth from '../../hooks/useAuth';
import useMovies from '../../hooks/useMovies';

import MoviesCard from '../../components/MoviesCard/index';
import InputSearch from '../../components/InputSearch';
import ShareButton from '../../components/ShareButton';
import NavMenu from '../../components/NavMenu';
import Snackbar from '../../components/Snackbar';

import './styles.css';

export default function Dashboard() {
    const { token, user: { id }, userLink } = useAuth();
    const { favorites, userFavorites } = useMovies();
    const [movies, setMovies] = useState([]);
    const [isFavoritesMode, setFavoritesMode] = useState(false);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    async function listOrSearchMovies(search) {
        if (isFavoritesMode) {
            const filteredFavorites = favorites.filter((movie) => {
                const title = movie.title || movie.original_title;
                return title.toLowerCase().includes(search.toLowerCase());
            });

            setMovies(filteredFavorites);
        } else {
            const url = search ? 'searchmovies' : 'listmovies';
            try {
                const data = await get(url, search ? { search: search } : {}, token);
                const response = await data.json();
                setMovies(response);
            } catch (error) {
                showError(error.message);
            }
        }
    }

    useEffect(() => {
        if (isFavoritesMode) {
            userFavorites(token);
        }
        listOrSearchMovies(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, isFavoritesMode]);

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    return (
        <div>
            <NavMenu />

            <div className="form-search">
                <InputSearch
                    className={search ? 'form-search-typed' : ''}
                    placeholder={'Search movies'}
                    value={search}
                    setValue={setSearch}
                    onChange={() => listOrSearchMovies(search)}
                />

                <ShareButton userId={id} link={userLink} />

                <button
                    className="select-favorites-btn"
                    onClick={() => setFavoritesMode(!isFavoritesMode)}
                >
                    {isFavoritesMode ? 'Show All Movies' : 'Show Favorites'}
                </button>
            </div>

            <div className={`container-movies ${movies.length > 0 ? '' : 'hide'}`}>
                {movies.map((movie, index) => (
                    <MoviesCard key={index} movie={movie} />
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