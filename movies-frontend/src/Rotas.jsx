import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MoviesProvider } from './context/MoviesContext';
import useAuth from './hooks/useAuth';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';

function RotasProtegidas({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/" />;
}

function Rotas() {
    return (
        <AuthProvider>
            <MoviesProvider>
                <Router>
                    <Routes>
                        <Route path="/cadastro" element={<Login />} />
                        <Route path="/" element={<Cadastro />} />
                        <Route
                            path="/restaurantes"
                            element={
                                <RotasProtegidas>
                                    <Dashboard />
                                </RotasProtegidas>
                            }
                        />
                    </Routes>
                </Router>
            </MoviesProvider>
        </AuthProvider>
    );
}

export default Rotas;