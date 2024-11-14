//ALTERAR CAMINHO PARA PEGAR DADOS DO BDD

import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { buscarPratos } from "../../Services/api/api";  //ALTERAR PARA 'buscarAlimentos' QUANDO ESTIVER TD PRONTO
import styles from "./Pratos.module.css"

function Pratos({ searchQuery }) {  //recebe parametro searchQuery
    const [listaPratos, setlistaPratos] = useState([]);     //lista completa de pratos
    const [pratosFiltrados, setPratosFiltrados] = useState([]); //lista filtrada de pratos a serem exibidos na tela
    const navigate = useNavigate();

    //effect pra chamar dunção que busca os dados da api
    useEffect(() => {
        async function carregarPratos() {
            try {
                console.log("Consultando API...")
                const data = await buscarPratos();  //chama a funcao e retorna com os dados dos pratos
                console.log("API consultada!");
                setlistaPratos(data);   //set da lista completa de pratos
                setPratosFiltrados(data);   //inicialmente os pratos filtrados são os mesmo das lista completa, mas depois vão sendo alterados conforme o input de pesquisa muda seu valor
            } catch (error) {
                alert("Não foi possível conectar à API.");
            }
        }
        carregarPratos();
    }, []);

    // effect para filtrar a lista de pratos quando a pesquisa ou a lista de pratos muda
    useEffect(() => {
        if (searchQuery) {
            setPratosFiltrados( //filtra os pratos com base na consulta de pesquisa
                listaPratos.filter((prato) =>
                    prato.nome.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setPratosFiltrados(listaPratos);    //se não houver consulta, mostrar todos os pratos na tela
        }
    }, [searchQuery, listaPratos]); //reexecuta quando a searchQuery ou a listaPratos muda

    
    const changePage = (path, prato) => {
        console.log(prato)
        navigate(path, {state: { prato } });

    }

    return (
        <>
            <div className={styles.listaCards}>
                {/* Verifique se a lista de pratos filtrados está vazia */}
                {pratosFiltrados.length === 0 ? (
                    // Se estiver vazia e houver um termo de pesquisa, mostre a mensagem
                    searchQuery && (
                        <p className={styles.textoPratoNaoEncontrado}>Prato não Encontrado!</p>
                    )
                ) : (
                    // Se não estiver vazia, mostre a lista de pratos filtrados
                    pratosFiltrados.map((prato) => (
                        <div key={prato.id} className={styles.cardContainer} onClick={() => changePage("/telaprato", prato)}>
                            <img src={prato.imagem} alt={prato.nome} className={styles.cardImage}/>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{prato.nome}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );    
};

export default Pratos;
