import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function useAuthProvider() {
    const [storedToken, setStoredToken, removeStoredToken] = useLocalStorage('TOKEN', null);
    const [token, setToken] = useState(storedToken);
    const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage('USER', null);
    const [user, setUser] = useState(storedUser);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setStoredToken(newToken);
        setUser(newUser);
        setStoredUser(newUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        removeStoredToken();
        removeStoredUser();
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            removeStoredToken();
            removeStoredUser();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [removeStoredToken, removeStoredUser]);

    return {
        token,
        user,
        login,
        logout,
    };
}