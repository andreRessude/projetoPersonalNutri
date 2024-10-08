import Title from '../../Components/Title/Title'; //titulo
import SearchBar from '../../Components/SearchBar/SearchBar'; //barra de pesquisa
import CameraButton from '../../Components/CameraButton/CameraButton';
import Pratos from '../../Components/Pratos/Pratos';  //lista de pratos na api
import Footer from '../../Components/Footer/Footer'; //rodapé
import { useState } from 'react';
import "./home.css";

function Home(){
    const [searchQuery, setSearchQuery] = useState(''); // estado q armazena o valor da pesquisa

    //funcao chamada quando a barra de pesquisa envia um novo valor 
    const handleSearch = (query) => {
        setSearchQuery(query);  //atualiza o estado com o valor recebido
    };

    return (
        <>
            <div id="componentes">
                <Title/>
                <div class="row">
                    <SearchBar onSearch={handleSearch}/>{/* passa a função handleSearch */}
                    <CameraButton/>
                </div>
                <Pratos searchQuery={searchQuery}/>{/* passa o valor da pesquisa para Pratos */}
                <Footer/>
            </div>
        </>
    )
}

export default Home;
