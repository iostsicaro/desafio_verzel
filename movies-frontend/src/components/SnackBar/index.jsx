import React, { useEffect } from 'react';
import './styles.css';
import WarnIcon from '../../assets/warning.svg';

export default function Snackbar({ openSnack, setOpenSnack, message }) {
    useEffect(() => {
        if (message) {
            setOpenSnack(true);
            const timer = setTimeout(() => {
                setOpenSnack(false);
            }, 3000); // Snackbar aparece por 3 segundos

            return () => clearTimeout(timer); // Limpa o temporizador quando o componente é desmontado ou a mensagem muda
        }
    }, [message]);

    const handleClose = () => {
        setOpenSnack(false);
    };

    return (
        <div
            className={`snackbar ${message?.status || ''} ${openSnack ? 'aberta' : ''}`}
            onClick={handleClose}
        >
            {openSnack && (
                <>
                    <div className="icone-alerta noselect">
                        {message?.status === 'erro' && (
                            <img src={WarnIcon} alt="Ícone de alerta" />
                        )}
                    </div>
                    <span className="noselect">
                        {message?.texto}
                    </span>
                </>
            )}
        </div>
    );
}