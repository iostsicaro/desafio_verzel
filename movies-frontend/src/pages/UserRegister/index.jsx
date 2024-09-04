import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { post } from '../../services/MoviesApiClient';

import InputPassword from '../../components/InputPassword/index';
import InputText from '../../components/InputText/index';
import Snackbar from '../../components/Snackbar/index';

import './styles.css';

export default function UserRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeated, setPasswordRepeated] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== passwordRepeated) {
            const msg = 'Password are not the same';

            showError(msg);
            return;
        }

        const createUser = {
            name,
            email,
            password,
        }

        try {
            console.log(createUser)
            const resposta = await post('register', createUser);

            if (!resposta.ok) {
                const msg = await resposta.json();

                showError(msg);
                return;
            }

            navigate('/'); 
        } catch (error) {
            showError(error.message);
        }
    }

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    return (
        <div className="img-cadastro">
            <div className="base cadastro">
                <div className="title-box">
                    <span className="titulo pagina">Register</span>
                </div>

                <form>
                    <div className="form-um">
                        <InputText
                            label="Nome"
                            placeholder="Enter your email"
                            value={name}
                            setValue={setName}
                        />

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

                        <InputPassword
                            label="Password"
                            name="passwordRepeated"
                            placeholder="Enter your password"
                            value={passwordRepeated}
                            setValue={setPasswordRepeated}
                        />
                    </div>

                    <div className="button-box">
                        <button
                            className="btn-movies"
                            type="submit"
                            onClick={(event) => handleSubmit(event)}
                        >
                            Register
                        </button>
                    </div>

                    <div className="link-box">
                        <span>Already have an account? </span>
                        <NavLink to="/">
                            Login</NavLink>
                    </div>
                </form>
            </div>

            <div className="ilustracao" />
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