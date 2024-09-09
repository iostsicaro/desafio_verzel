import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { post } from '../../services/MoviesApiClient';
import './styles.css';

import Snackbar from '../../components/Snackbar';
import ShareIcon from '../../assets/share-icon-solid.svg';

const ShareButton = ({ userId }) => {
    const [shareLink, setShareLink] = useState(null);
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { token } = useAuth();

    const handleShare = async () => {
        try {
            const response = await post('share', null, token);
            setShareLink(response.data.shareLink);
        } catch (error) {
            showError(error.message);
        }
    };

    function showError(texto) {
        setOpenSnack(true);
        setMessage({ texto, status: 'erro' });
    }

    return (
        <div className="flex-column">
            <img
                src={ShareIcon}
                alt="share icon"
                className='share-icon'
                onClick={handleShare}
            />

            {shareLink && (
                <div>
                    <p>Share this link with others:</p>
                    <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a>
                </div>
            )}

            {message && (
                <Snackbar
                    message={message}
                    openSnack={openSnack}
                    setOpenSnack={setOpenSnack}
                />
            )}
        </div>
    );
};

export default ShareButton;