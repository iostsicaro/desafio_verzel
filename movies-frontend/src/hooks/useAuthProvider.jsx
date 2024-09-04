import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function useAuthProvider() {
    const [storedToken, setStoredToken, removeStoredToken] = useLocalStorage('TOKEN', null);
    const [token, setToken] = useState(storedToken);

    const login = (newToken) => {
        setToken(newToken);
        setStoredToken(newToken);
    };

    const logout = () => {
        setToken(null);
        removeStoredToken();
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            removeStoredToken();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [removeStoredToken]);

    return {
        token,
        login,
        logout,
    };
}