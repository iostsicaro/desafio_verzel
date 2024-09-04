import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { post } from '../../services/MoviesApiClient';
import './styles.css';
import InputPassword from '../../components/InputPassword/index';
import InputText from '../../components/InputText/index';
import Snackbar from '../../components/SnackBar/index';

export default function UserRegister() {
    const [mensagem, setMensagem] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { register, handleSubmit, formState, getValues } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data) {
        if (data.senha !== data.senhaRepetida) {
            const msg = 'Senhas não são iguais';

            setMensagem({ texto: msg, status: 'erro' });
            setOpenSnack(true);
            return;
        }

        delete data.senhaRepetida;

        try {
            const resposta = await post('consumidor', data);

            if (!resposta.ok) {
                const msg = await resposta.json();

                setMensagem({ texto: msg, status: 'erro' });
                setOpenSnack(true);
                return;
            }

            navigate('/'); 
        } catch (error) {
            setMensagem({ texto: error.message, status: 'erro' });
            setOpenSnack(true);
        }
    }

    return (
        <div className="img-cadastro">
            <div className="base cadastro">
                <div className="title-box">
                    <span className="titulo pagina">Cadastro</span>
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
                            {...register('password')}
                        />
                    </div>

                    <div className="button-box">
                        <button
                            className="aceitar"
                            type="submit"
                        >
                            Criar conta
                        </button>
                    </div>

                    <div className="link-box">
                        <span>Já tem uma conta? </span>
                        <NavLink to="/">
                            Login</NavLink>
                    </div>
                </form>
            </div>

            <div className="ilustracao" />
            {mensagem && (
                <Snackbar
                    mensagem={mensagem}
                    openSnack={openSnack}
                    setOpenSnack={setOpenSnack}
                />
            )}
        </div>
    );
}