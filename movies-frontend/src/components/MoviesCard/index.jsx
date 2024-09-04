import React from 'react';
import './styles.css';

export default function MoviesCard({ movie, onClick }) {
    const {
        id,
        title,
        description,
        popularity,
        url_image
    } = movie;

    const handleClick = () => onClick(movie);

    return (
        <div className="card-container" style={{ position: 'relative' }} onClick={handleClick}>
            <div className="card-content">
                <div className="flex-column">
                    <span className="card-titulo">{title}</span>
                    <span className="card-texto">{description}</span>
                    <div className="card-preco">{popularity}</div>
                </div>
                
                <div className="imagem-card">
                    <img src={url_image} alt={title} />
                </div>
            </div>
        </div>
    );
}