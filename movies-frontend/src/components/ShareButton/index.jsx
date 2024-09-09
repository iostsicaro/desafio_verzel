import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { get, post } from '../../services/MoviesApiClient';
import './styles.css';

import Snackbar from '../../components/Snackbar';
import ShareIcon from '../../assets/share-icon-solid.svg';

const ShareButton = ({ userId, link }) => {
    const [shareLink, setShareLink] = useState('');
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { userLink } = useAuth();

    function handleShare() {
        if (shareLink) {
            setShareLink('');
        } else {
            setShareLink(`${window.location.protocol}//${window.location.host}/${userLink}`);
        }
    };

    return (
        <div>
            <div className={shareLink ? 'share-icon-displayed' : 'share-icon'} onClick={handleShare}>
                <img
                    src={ShareIcon}
                    alt="share icon"
                />
            </div>


            {shareLink && (
                <div className='share-icon-content'>
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