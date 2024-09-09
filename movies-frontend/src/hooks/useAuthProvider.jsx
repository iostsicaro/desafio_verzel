import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { get, post } from '../services/MoviesApiClient';

export default function useAuthProvider() {
    const [storedToken, setStoredToken, removeStoredToken] = useLocalStorage('TOKEN', null);
    const [token, setToken] = useState(storedToken);
    const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage('USER', null);
    const [user, setUser] = useState(storedUser);
    const [storedUserLink, setStoredUserLink, removeStoredUserLink] = useLocalStorage('USERLINK', null);
    const [userLink, setUserLink] = useState(storedUserLink);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setStoredToken(newToken);
        setUser(newUser);
        setStoredUser(newUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setUserLink(null);
        removeStoredToken();
        removeStoredUser();
        removeStoredUserLink();
    };

    const link = async (token) => {
        try {
            if (!storedUserLink) {
                const response = await get('userlink', {}, token);

                if (!response.ok) {
                    const createlink = await post('createlink', null, token);
                    const { link_token } = await createlink.json();

                    setUserLink(link_token);
                    setStoredUserLink(link_token);
                } else {
                    const { link_token } = await response.json();

                    setUserLink(link_token);
                    setStoredUserLink(link_token);
                }
            }
        } catch (error) {
            console.error('Erro ao buscar favoritos do usuário:', error);
        }
    }

    useEffect(() => {
        const handleBeforeUnload = () => {
            removeStoredToken();
            removeStoredUser();
            removeStoredUserLink();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [removeStoredToken, removeStoredUser, removeStoredUserLink]);

    return {
        token,
        user,
        userLink,
        login,
        logout,
        link
    };
}