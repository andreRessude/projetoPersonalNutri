import Title from '../../Components/Title/Title'; 
import SearchBar from '../../Components/SearchBar/SearchBar'; 
import CameraButton from '../../Components/CameraButton/CameraButton';
import Pratos from '../../Components/Pratos/Pratos'; // lista de pratos da api
import Footer from '../../Components/Footer/Footer';
import DeveloperButton from '../../Components/DeveloperButton/DeveloperButton'; 
import { useState } from 'react';
import styles from "./Home.module.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState(''); // estado que armazena o valor da pesquisa

    // funcao chamada quando a barra de pesquisa envia um novo valor
    const handleSearch = (query) => {
        setSearchQuery(query);  // atualiza o estado com o valor recebido
    };

    return (
        <>
            <div className={styles.components}>
                <Title/>
                <div className={styles.row}>
                    <SearchBar onSearch={handleSearch} />
                    <CameraButton/>
                </div>
                <Pratos searchQuery={searchQuery} />
                <DeveloperButton />
                <Footer/>
            </div>
        </>
    );
}

export default Home;
