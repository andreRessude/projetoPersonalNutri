import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeveloperButton.module.css';

const DeveloperButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {     //funcao de troca de tela
        navigate('/teladeveloper');
    };

    return (
        //botao 'modo desenvolvedor'
        <button onClick={handleClick} className={styles.developerButton}>Modo Desenvolvedor</button>
    );
};

export default DeveloperButton;
