import React from 'react';
import './styles.css';
import WarnIcon from '../../assets/warning.svg';

export default function Snackbar({ openSnack, setOpenSnack, mensagem }) {
    const handleClose = () => {
        setOpenSnack(false);
    };

    return (
        <div
            className={`snackbar ${mensagem?.status || ''} ${openSnack ? 'aberta' : ''}`}
            onClick={handleClose}
        >
            {openSnack && (
                <>
                    <div className="icone-alerta noselect">
                        {mensagem?.status === 'erro' && (
                            <img src={WarnIcon} alt="Ícone de alerta" />
                        )}
                    </div>
                    <span className="noselect">
                        {mensagem?.texto}
                    </span>
                </>
            )}
        </div>
    );
}