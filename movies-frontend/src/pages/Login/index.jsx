import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (errors.email) {
            showError(errors.email.message);
        }

        if (errors.password) {
            showError(errors.password.message);
        }
    }, [errors]);

    async function onSubmit(data) {
        try {
            const resposta = await post('login', data);

            if (!resposta.ok) {
                const msg = await resposta.json();
                
                showError(msg);
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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText
                        label="E-mail"
                        {...register('email', {
                            required: 'E-mail is a mandatory field',
                            minLength: { value: 3, message: 'Invalid e-mail' },
                        })}
                    />

                    <InputPassword
                        label="Password"
                        {...register('password', {
                            required: 'Password is a mandatory field',
                            minLength: { value: 5, message: 'The password must be at least five characters long' },
                        })}
                    />

                    <div className="button-box">
                        <button className="btn-movies" type="submit">
                            Log-in
                        </button>
                    </div>

                    <div className="link-box">
                        <span>Don't have an account yet? </span>
                        <NavLink to="/cadastro">Register</NavLink>
                    </div>
                </form>
            </div>

            <Snackbar
                message={message}
                openSnack={openSnack}
                setOpenSnack={setOpenSnack}
            />
        </div>
    );
}