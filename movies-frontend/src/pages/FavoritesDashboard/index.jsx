import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../services/MoviesApiClient';

import InputSearch from '../../components/InputSearch';
import Snackbar from '../../components/Snackbar';
import Illustration from '../../assets/illustration-header.svg';
import HeadImagem from '../../assets/bg-dashboard.jpg';

import './styles.css';

export default function FavoritesDashboard() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { link_token } = useParams();

    async function listOrSearchFavoriteMovies() {
        try {
            const data = await get(`share/${link_token}`, {});
            const response = await data.json();

            setMovies(response);
            setFilteredMovies(response);
            return;
        } catch (error) {
            showError(error.message);
        }
    }

    useEffect(() => {
        listOrSearchFavoriteMovies()
    }, [link_token]);

    useEffect(() => {
        searchFavorites(search);
    }, [search, movies]);

    function formatDate(release_date) {
        const date = new Date(release_date);

        if (isNaN(date)) {
            console.error("Invalid date:", release_date);
            return "Invalid date";
        }

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function searchFavorites(search) {
        const filtered = movies.filter(movie =>
            movie.original_title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredMovies(filtered);
    }

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    return (
        <div>
            <div>
                <div
                    className="imagem-cabecalho"
                    style={{ backgroundImage: `url(${HeadImagem})` }}
                />

                <img className="dash-ilustracao" src={Illustration} alt="Ilustração" />

                <div className="localizar-titulo">
                    <span className="titulo sombreado">
                        Friend's Favorite Movies
                    </span>
                </div>
            </div>

            <div className="form-search">
                <InputSearch
                    className={search ? 'form-search-typed' : ''}
                    placeholder={'Search movies'}
                    value={search}
                    setValue={setSearch}
                />
            </div>

            <div className={`container-movies ${filteredMovies.length > 0 ? '' : 'hide'}`}>
                {filteredMovies.map((movie, index) => (
                    <div key={index} className="card-container">
                        <div className="card-content">
                            <div className="text-content">
                                <span className="card-title">{movie.original_title}</span>
                                <span className="card-description">{movie.overview ? movie.overview : 'Empty Description'}</span>
                                <div className="card-popularity">Popularity: {movie.popularity}</div>
                                <div className="card-release">Release date: {formatDate(movie.release_date)}</div>
                            </div>

                            <div className="image-container">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.url_image}`} alt={movie.original_title} className="card-image" />
                            </div>
                        </div>
                    </div>
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