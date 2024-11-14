import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeveloperButton.module.css';

const DeveloperButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/teladeveloper');
    };

    return (
        <button onClick={handleClick} className={styles.developerButton}>
            Modo Desenvolvedor
        </button>
    );
};

export default DeveloperButton;
