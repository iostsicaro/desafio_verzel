import React from 'react';
import useAuth from '../../hooks/useAuth';

import Avatar from '../../assets/avatar.png';
import Illustration from '../../assets/illustration-header.svg';
import HeadImagem from '../../assets/bg-dashboard.jpg';

import './styles.css';

export default function NavMenu() {
    const { logout } = useAuth();

    return (
        <div>
            <div
                className="imagem-cabecalho"
                style={{ backgroundImage: `url(${HeadImagem})` }}
            />

            <img className="dash-ilustracao" src={Illustration} alt="Ilustração" />

            <div className="avatar-borda">
                <img
                    className="avatar"
                    src={Avatar}
                    alt='Avatar'
                />
            </div>

            <div className="localizar-titulo">
                <span className="titulo sombreado">
                    Fav Movies
                </span>

                <button
                    className="botao-logout sombreado"
                    type="button"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}