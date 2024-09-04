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
    const [mensagem, setMensagem] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logar } = useAuth();
    const navigate = useNavigate(); // Substitui useHistory

    useEffect(() => {
        if (errors.email) {
            setMensagem({ texto: errors.email.message, status: 'erro' });
            setOpenSnack(true);
        }

        if (errors.senha) {
            setMensagem({ texto: errors.senha.message, status: 'erro' });
            setOpenSnack(true);
        }
    }, [errors]);

    async function onSubmit(data) {
        try {
            const resposta = await post('login', data);

            if (!resposta.ok) {
                const msg = await resposta.json();
                setMensagem({ texto: msg, status: 'erro' });
                setOpenSnack(true);
                return;
            }

            const { token } = await resposta.json();
            logar(token);
            navigate('/movies');
        } catch (error) {
            setMensagem({ texto: error.message, status: 'erro' });
            setOpenSnack(true);
        }
    }

    return (
        <div className="img-login">
            <img className="ilustracao" src={IllustrationLogin} alt="Ilustração Login" />

            <div className="base login">
                <div className="title-box">
                    <span className="titulo pagina">Login</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText
                        label="Email"
                        {...register('email', {
                            required: 'Email é um campo obrigatório',
                            minLength: { value: 3, message: 'Email inválido' },
                        })}
                    />

                    <InputPassword
                        label="Senha"
                        {...register('senha', {
                            required: 'Senha é um campo obrigatório',
                            minLength: { value: 5, message: 'A senha deverá ter pelo menos cinco caracteres' },
                        })}
                    />

                    <div className="button-box">
                        <button className="btn-movies" type="submit">
                            Entrar
                        </button>
                    </div>

                    <div className="link-box">
                        <span>Ainda não tem uma conta? </span>
                        <NavLink to="/cadastro">Cadastre-se</NavLink>
                    </div>
                </form>
            </div>

            <Snackbar
                mensagem={mensagem}
                openSnack={openSnack}
                setOpenSnack={setOpenSnack}
            />
        </div>
    );
}