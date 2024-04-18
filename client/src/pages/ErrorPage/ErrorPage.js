import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
     const location = useLocation();
     const errorMessage = new URLSearchParams(location.search).get('error');
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{errorMessage || "Դուք առայժմ դասեր չունեք!"}</h1>
        </div>
    );
};

export default ErrorPage;
