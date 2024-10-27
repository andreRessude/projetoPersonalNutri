import Title from '../../Components/Title/Title'; // Título
import SearchBar from '../../Components/SearchBar/SearchBar'; // Barra de pesquisa
import CameraButton from '../../Components/CameraButton/CameraButton';
import Pratos from '../../Components/Pratos/Pratos'; // Lista de pratos na API
import Footer from '../../Components/Footer/Footer'; // Rodapé
import { useState } from 'react';
import styles from "./Home.module.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState(''); // Estado que armazena o valor da pesquisa

    // Função chamada quando a barra de pesquisa envia um novo valor
    const handleSearch = (query) => {
        setSearchQuery(query);  // Atualiza o estado com o valor recebido
    };

    

    return (
        <>
            <div className={styles.componentes}>
                <Title/>
                <div className={styles.row}>
                    <SearchBar onSearch={handleSearch} />
                    <CameraButton/>
                </div>
                <Pratos searchQuery={searchQuery} />
                <Footer/>
            </div>
        </>
    );
}

export default Home;
