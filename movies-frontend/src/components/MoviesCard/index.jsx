import React, { useState } from 'react';
import { del, post } from '../../services/MoviesApiClient';
import useAuth from '../../hooks/useAuth';

import Snackbar from '../../components/Snackbar';
import IconHeart from '../../assets/icon-heart-black.svg';
import IconHeartFilled from '../../assets/icon-heart-filled.svg';

import './styles.css';

export default function MoviesCard({ movie }) {
    const { token } = useAuth();
    const {
        id,
        title,
        overview,
        popularity,
        release_date,
        poster_path
    } = movie;

    const [isFavorite, setFavorite] = useState(false);
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    function handleFavorite() {
        if (!isFavorite) {
            addFavorite();
            setFavorite(true);
            return;
        } else {
            removeFavorite();
            setFavorite(false);
            return;
        }
    }

    async function addFavorite() {
        try {
            const response = await post(`addfavorite/${id}`, null, token);

            if (!response.ok) {
                const msg = await response.json();

                showError(msg);
                return;
            }
            
            return;
        } catch (error) {
            showError(error.message);
        }
    }

    async function removeFavorite() {
        try {
            const response = await del(`removefavorite/${id}`, token);

            if (!response.ok) {
                const msg = await response.json();

                showError(msg);
                return;
            }

            return;
        } catch (error) {
            showError(error.message);
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
                        <span className="card-description">{overview}</span>
                        <div className="card-popularity">Popularity: {popularity}</div>
                        <div className="card-popularity">{release_date}</div>
                        <img
                            src={isFavorite ? IconHeartFilled : IconHeart}
                            alt="coração"
                            className='card-heart'
                            onClick={() => handleFavorite()}
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