import React, { useState } from 'react';
import useMovies from '../../hooks/useMovies';

import IconFechar from '../../assets/x.svg';
import IconHeart from '../../assets/icon-heart-black.svg';
import IconHeartFilled from '../../assets/icon-heart-filled';

import './styles.css';

export default function ModalMovie({ movie, abrirModal, setOpenModal }) {
    const { addMovie, addFavorite, removeMovie, removeFavorite, favorites } = useMovies();
    const [isFavorite, setIsFavorite] = useState(
        favorites.some(fav => fav.id === movie.id)
    );

    function toggleFavorite() {
        if (isFavorite) {
            removeMovie(movie.id);
            removeFavorite(movie.id);
        } else {
            addMovie(movie);
            addFavorite(movie);
        }
        setIsFavorite(!isFavorite);
    }

    function closeModal() {
        setOpenModal(false);
    }

    return (
        <>
            {abrirModal && (
                <div className="modal">
                    <div className="base n-movie">
                        <img
                            className="fechar"
                            src={IconFechar}
                            alt="fechar"
                            onClick={closeModal}
                        />

                        <div className="img-movie-modal"
                            style={{ backgroundImage: `url('${movie.url_imagem}')` }}
                        />

                        <div className="detalhes-movie">
                            <div className="nome-movie">{movie.nome}</div>

                            <div className="descricao-movie">{movie.descricao}</div>

                            <div className="acoes-movie">
                                <button
                                    className="icon-heart"
                                    onClick={toggleFavorite}
                                >
                                    <img
                                        src={isFavorite ? IconHeartFilled : IconHeart}
                                        alt="coração"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}