import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear error message initially

        try {
            // Assuming the API is expecting 'username' and 'password'
            const response = await axios.post('http://www.tsf.somee.com/api/Auth/Login', {
                username: username,
                password: password
            });

            console.log('Login successful:', response.data);
            // Handle successful login (e.g., redirect, store token)
        } catch (error) {
            if (error.response) {
                // Handle specific HTTP errors
                if (error.response.status === 401) {
                    setErrorMessage('Invalid username or password');
                } else {
                    setErrorMessage('An error occurred. Please try again later.');
                }
            } else {
                setErrorMessage('Could not connect to the server. Please check your network.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
};

export default Login;
