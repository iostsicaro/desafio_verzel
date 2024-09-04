import React, { useState } from 'react';

import IconHeart from '../../assets/icon-heart-black.svg';
import IconHeartFilled from '../../assets/icon-heart-filled.svg';

import './styles.css';

export default function MoviesCard({ movie, onClick }) {
    const {
        title,
        overview,
        popularity,
        url_image
    } = movie;
    const [isFavorite, setFavorite] = useState(false);

    function handleFavorite() {
        if (!isFavorite) {
            setFavorite(true);
        } else {
            setFavorite(false);
        }
    }

    return (
        <>
            <div className="card-container">
                <div className="card-content">
                    <div className="text-content">
                        <span className="card-title">{title}</span>
                        <span className="card-description">{overview}</span>
                        <div className="card-popularity">{popularity}</div>
                        <img
                            src={isFavorite ? IconHeartFilled : IconHeart}
                            alt="coração"
                            className='card-heart'
                            onClick={() => handleFavorite()}
                        />
                    </div>
                    <div className="image-container">
                        <img src={url_image} alt={title} className="card-image" />
                    </div>
                </div>
            </div>
        </>
    );
}