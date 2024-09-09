import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MoviesProvider } from './context/MoviesContext';
import ProtectedRoute from './utils/ProtectedRoutes';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';

function AppRoutes() {
    return (
        <AuthProvider>
            <MoviesProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<UserRegister />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/movies" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </Router>
            </MoviesProvider>
        </AuthProvider>
    );
}

export default AppRoutes;