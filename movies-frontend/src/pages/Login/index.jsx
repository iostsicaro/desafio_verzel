import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { post } from '../../services/MoviesApiClient';

import IllustrationLogin from '../../assets/illustration-login.svg';
import InputPassword from '../../components/InputPassword/index';
import InputText from '../../components/InputText/index';
import Snackbar from '../../components/Snackbar/index';

import './styles.css';

export default function Login() {
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const loginUser = {
            email,
            password,
        };

        if (!email && !password) {
            showError('All data must be filled in')
        }

        try {
            const resposta = await post('login', loginUser);

            if (!resposta.ok) {
                const msg = await resposta.json();

                if (!msg) {
                    showError(resposta.statusText);
                } else {
                    showError(msg);
                }
                
                return;
            }

            const { token } = await resposta.json();

            login(token);

            navigate('/movies');
        } catch (error) {
            showError(error.message);
        }
    }

    function showError(texto) {
        setMessage({ texto, status: 'erro' });
        setOpenSnack(true);
    }

    return (
        <div className="img-login">
            <img className="ilustracao" src={IllustrationLogin} alt="Illustration Login" />

            <div className="base login">
                <div className="title-box">
                    <span className="titulo pagina">Login</span>
                </div>

                <form>
                    <InputText
                        label="E-mail"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        setValue={setEmail}
                    />

                    <InputPassword
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        setValue={setPassword}
                    />

                    <div className="button-box">
                        <button className="btn-movies" type="submit" onClick={(event) => handleSubmit(event)}>
                            Log-in
                        </button>
                    </div>

                    <div className="link-box">
                        <span>Don't have an account yet? </span>
                        <NavLink to="/cadastro">Register</NavLink>
                    </div>
                </form>
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