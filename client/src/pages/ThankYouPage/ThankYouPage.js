import React from 'react';
import styles from './ThankYouPage.module.css';

const ThankYouPage = ({ message, buttonText, onButtonClick }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Շնորհակալություն,դուք գրանցվել եք դասամատյանում</h1>
            <p className={styles.message}>{message}</p>
         </div>
    );
};

export default ThankYouPage;