import React, { useState, useEffect } from 'react';
import { get } from '../../services/MoviesApiClient';
import useAuth from '../../hooks/useAuth';

import MoviesCard from '../../components/MoviesCard/index';
import InputSearch from '../../components/InputSearch';
import NavMenu from '../../components/NavMenu';
import Snackbar from '../../components/Snackbar';

import './styles.css';

export default function Dashboard() {
    const { token } = useAuth();
    const [movies, setMovies] = useState([]);
    const [movieSelected, setMovieSelected] = useState('');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    async function listMovies(search) {
        try {
            const url = 'listmovies'
            const data = await get(url, token)

            const response = await data.json();

            setMovies(response);
        } catch (error) {
            showError(error.message);
        }
    }

    useEffect(() => {
        listMovies(search)
    }, [search]);

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    function showModal(movie) {
        setMovieSelected(movie)
        setOpenModal(true);
    }

    return (
        <div>
            <div className={(openModal) && 'blurry'}>
                <NavMenu />

                <div className="form-search">
                    <form>
                        <InputSearch placeholder={'Search movies'} value={search} setValue={setSearch} />
                    </form>
                </div>

                <div className={`container-movies ${movies.length > 0 ? '' : 'hide'}`}>
                    {movies.map((movie) => (
                        <MoviesCard
                            key={movie.title}
                            movie={movie}
                            onClick={() => showModal(movie)} // Corrigido aqui
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
        </div>
    );
}