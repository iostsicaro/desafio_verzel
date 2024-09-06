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
    //const [movieSelected, setMovieSelected] = useState('');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    async function listOrSearchMovies(search) {
        const url = search ? 'searchmovies' : 'listmovies';

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
        listOrSearchMovies(search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    return (
        <div>
            <div>
                <NavMenu />

                <div className="form-search">
                    <InputSearch placeholder={'Search movies'} value={search} setValue={setSearch} onChange={() => listOrSearchMovies(search)} />
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
        </div>
    );
}