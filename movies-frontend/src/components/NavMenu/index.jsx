import React from 'react';
import useAuth from '../../hooks/useAuth';
import useMovies from '../../hooks/useMovies';

import Avatar from '../../assets/avatar.png';
import HeadImagem from '../../assets/bg-dashboard.jpg';

import './styles.css';

export default function NavMenu() {
    const { logout, user } = useAuth();
    const { clearFavorites } = useMovies();

    function handleLogout() {
        clearFavorites();
        logout();
    }

    return (
        <div>
            <div
                className="imagem-cabecalho"
                style={{ backgroundImage: `url(${HeadImagem})` }}
            />

            <div className="avatar-borda">
                <img
                    className="avatar"
                    src={Avatar}
                    alt='Avatar'
                />
            </div>

            <div className="localizar-titulo">
                <span className="titulo sombreado">
                    Bem-vindo, {user.name}!! Fav Movies
                </span>

                <button
                    className="botao-logout sombreado"
                    type="button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}