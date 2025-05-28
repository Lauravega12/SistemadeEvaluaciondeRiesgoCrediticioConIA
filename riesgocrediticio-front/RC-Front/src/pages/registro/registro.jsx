import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registro.css';

const Registro = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación básica
        if (formData.password !== formData.confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            setIsError(true);
            return;
        }

        if (formData.username.length < 3) {
            setMessage('El nombre de usuario debe tener al menos 3 caracteres');
            setIsError(true);
            return;
        }

        if (formData.password.length < 6) {
            setMessage('La contraseña debe tener al menos 6 caracteres');
            setIsError(true);
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username: formData.username,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setMessage('Usuario registrado exitosamente');
            setIsError(false);
            
            // Limpiar formulario
            setFormData({
                username: '',
                password: '',
                confirmPassword: ''
            });

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('Error al registrar:', error);
            
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else if (error.response?.status === 400) {
                setMessage('Error: Datos inválidos o usuario ya existe');
            } else {
                setMessage('Error al conectar con el servidor');
            }
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <div className="registro-card">
                <h2>User Registration</h2>
                
                <form onSubmit={handleSubmit} className="registro-form">
                    <div className="form-group">
                        <label htmlFor="username">User Name:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Insert Your Username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Insert Your Password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Your Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Confirm Your Password"
                        />
                    </div>

                    {message && (
                        <div className={`message ${isError ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="registro-button"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Register'}
                    </button>

                    <button 
                        type="button" 
                        className="back-to-login-button"
                        onClick={() => navigate('/login')}
                        disabled={loading}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registro;