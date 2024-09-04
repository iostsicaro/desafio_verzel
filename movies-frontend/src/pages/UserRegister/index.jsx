import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { post } from '../../services/MoviesApiClient';

import InputPassword from '../../components/InputPassword/index';
import InputText from '../../components/InputText/index';
import Snackbar from '../../components/Snackbar/index';

import './styles.css';

export default function UserRegister() {
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { register, handleSubmit, formState, getValues } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data) {
        if (data.password !== data.repeatedPassword) {
            const msg = 'Password are not the same';

            showError(msg);
            return;
        }

        delete data.repeatedPassword;

        try {
            const resposta = await post('registeruser', data);

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
        setMessage({ texto, status: 'erro' });
        setOpenSnack(true);
    }

    return (
        <div className="img-cadastro">
            <div className="base cadastro">
                <div className="title-box">
                    <span className="titulo pagina">Register</span>
                </div>

                <form
                    className="formulario"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-um">
                        <InputText
                            label="Username"
                            placeholder="Type your name"
                            {...register('name')}
                        />

                        <InputText
                            label="E-mail"
                            placeholder="Type your e-mail"
                            {...register('email', {
                                minLength: { value: 3, message: 'Invalid e-mail' },
                            })}
                        />

                        <InputPassword
                            label="Password"
                            placeholder="Type your password"
                            {...register('password')}
                        />

                        <InputPassword
                            label="Password"
                            placeholder="Type your password"
                            {...register('repeatedPassword')}
                        />
                    </div>

                    <div className="button-box">
                        <button
                            className="btn-movies"
                            type="submit"
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