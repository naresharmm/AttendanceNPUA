import React, { useState } from 'react';
import { useLoginMutation } from "../../features/authApi";
import { useNavigate } from 'react-router-dom';
import { setRoles, setToken } from "../../helpers/auth";
import { setLoginSuccess } from "../../slice/authSlice";
import { useDispatch } from "react-redux";
import styles from './login.module.css';
import polytechImage from '../../polytech.jpg'; 

const { wrapper, loginForm, inputField, loginButton } = styles;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, error }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            login({ email, password }).then(data => {
                const { token, roles } = data?.data || {};

                if (token) {
                    setToken(token);
                    setRoles(roles);

                    navigate('/dashboard');
                    dispatch(setLoginSuccess());
                }
            });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={wrapper} style={{ backgroundImage: `url(${polytechImage})` }}>
            <div className={loginForm}>
                <h2>Մուտք</h2>
                <input type="email" className={inputField} placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className={inputField} placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button className={loginButton} onClick={handleLogin}>Մուտք</button>
                {isLoading && <p>Բեռնվում է...</p>}
                {error && (
                    <div className={styles.errorMessage}>
                        Սխալ մուտքագրված գաղտնաբառ կամ էլ. հասցե: {error.message}
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default Login;

