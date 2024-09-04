import React, { useState, useEffect } from 'react';
import { get } from '../../services/MoviesApiClient';
import useAuth from '../../hooks/useAuth';

import MoviesCard from '../../components/MoviesCard/index';
import ModalMovie from '../../components/ModalMovies/index';
import InputBusca from '../../components/InputBusca';
import Cabecalho from '../../components/Cabecalho';
import Snackbar from '../../components/Snackbar';

import './styles.css';


export default function Dashboard() {
    const { token } = useAuth();

    const [movies, setMovies] = useState('');
    const [movieSelected, setMovieSelected] = useState('');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    async function listMovies(search, filter) {
        try {
            const url = `listmovies`
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
        setMessage({ texto, status: 'erro' });
        setOpenSnack(true);
    }

    function showModal(movie) {
        setMovieSelected(movie)
        setOpenModal(true);
    }

    function back() {
        setSearch('');
        setOpenModal(false);
        setMessage('');
        setOpenSnack(false);
    }

    return (
        <div>
            <ModalMovie
                movie={movieSelected}
                abrirModal={openModal}
                setOpenModal={setOpenModal}
            />

            <div className={(openModal) && 'blurry'}>
                <Cabecalho />

                <div className="form-search">
                    <form>
                        <InputBusca value={search} setValue={setSearch} />
                    </form>
                </div>

                <div className={`container-movies ${movies ? '' : 'hide'}`}>
                    {movies && movies.map(movie => (
                        <MoviesCard key={movie.title} movie={movie} onClick={showModal(movie)} />
                    ))}
                </div>

                <Snackbar
                    message={message}
                    openSnack={openSnack}
                    setOpenSnack={setOpenSnack}
                />
            </div>
        </div>
    );
}