import React, { useState, useEffect } from 'react';
import { del, post } from '../../services/MoviesApiClient';
import useAuth from '../../hooks/useAuth';
import useMovies from '../../hooks/useMovies';

import Snackbar from '../../components/Snackbar';
import IconHeart from '../../assets/icon-heart-black.svg';
import IconHeartFilled from '../../assets/icon-heart-filled.svg';

import './styles.css';

export default function MoviesCard({ movie }) {
    const { token } = useAuth();
    const { addFavorite, removeFavorite, isFavorite } = useMovies();

    const {
        id,
        title,
        original_title,
        overview,
        popularity,
        release_date,
        poster_path
    } = movie;

    const [isFavoriteSelected, setFavoriteSelected] = useState(false);
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    useEffect(() => {
        setFavoriteSelected(isFavorite(id));
    }, [id, isFavorite]);

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

    async function handleFavorite() {
        if (isFavoriteSelected) {
            const success = await removeFavoriteDatabase();

            if (success) {
                removeFavorite(id);
                setFavoriteSelected(false);
            }
        } else {
            const success = await addFavoriteDatabase();

            if (success) {
                addFavorite(movie);
                setFavoriteSelected(true);
            }
        }
    }

    async function addFavoriteDatabase() {
        try {
            const response = await post(`addfavorite/${id}`, null, token);

            if (!response.ok) {
                const msg = await response.json();
                showError(msg);

                return false;
            }

            return true;
        } catch (error) {
            showError(error.message);
            return false;
        }
    }

    async function removeFavoriteDatabase() {
        try {
            const response = await del(`removefavorite/${id}`, token);

            if (!response.ok) {
                const msg = await response.json();
                showError(msg);

                return false;
            }

            return true;
        } catch (error) {
            showError(error.message);
            return false;
        }
    }

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    return (
        <>
            <div className="card-container">
                <div className="card-content">
                    <div className="text-content">
                        <span className="card-title">{title}</span>
                        <span className="card-description">{overview ? overview : 'Empty Description'}</span>
                        <div className="card-popularity">Popularity: {popularity}</div>
                        <div className="card-release">Release date: {formatDate(release_date)}</div>

                        <img
                            src={isFavoriteSelected ? IconHeartFilled : IconHeart}
                            alt="coração"
                            className='card-heart'
                            onClick={handleFavorite}
                        />
                    </div>
                    <div className="image-container">
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="card-image" />
                    </div>
                </div>
            </div>

            {message && (
                <Snackbar
                    message={message}
                    openSnack={openSnack}
                    setOpenSnack={setOpenSnack}
                />
            )}
        </>
    );
}