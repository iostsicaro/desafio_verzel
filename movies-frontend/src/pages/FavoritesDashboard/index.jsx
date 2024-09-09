import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useMovies from '../../hooks/useMovies';

import Snackbar from '../../components/Snackbar';

import './styles.css';

export default function FavoritesDashboard() {
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const { login } = useAuth();
    const { userFavorites } = useMovies();

    return (
        <div>
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