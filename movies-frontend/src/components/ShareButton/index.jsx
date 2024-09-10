import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './styles.css';

import ShareIcon from '../../assets/share-icon-solid.svg';

const ShareButton = ({ userId, link }) => {
    const [shareLink, setShareLink] = useState('');
    const { userLink } = useAuth();

    function handleShare() {
        if (shareLink) {
            setShareLink('');
        } else {
            setShareLink(`${window.location.protocol}//${window.location.host}/share/${userLink}`);
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
        </div>
    );
};

export default ShareButton;