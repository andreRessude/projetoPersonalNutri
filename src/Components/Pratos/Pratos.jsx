import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { buscarAlimento, buscarPrato } from "../../Services/api/api";  //ALTERAR PARA 'buscarAlimentos' QUANDO ESTIVER TD PRONTO
import styles from "./Pratos.module.css"

function Pratos({ searchQuery }) {  //recebe parametro searchQuery
    const [listaPratos, setlistaPratos] = useState([]);     //lista completa de pratos
    const [pratosFiltrados, setPratosFiltrados] = useState([]); //lista filtrada de pratos a serem exibidos na tela
    const navigate = useNavigate();

    //effect pra chamar dunção que busca os dados da api
   useEffect(() => {
    async function carregarItens() {
      try {
        console.log("Consultando API...");

        // Faz a requisição para buscar os pratos e alimentos
        const pratos = await buscarPrato();
        const alimentos = await buscarAlimento();

        // Garante que ambos sejam arrays antes de concatenar
        const data = [...(pratos || []), ...(alimentos || [])];

        console.log("API consultada!");

        // Atualiza o estado com os dados combinados
        setlistaPratos(data);
        setPratosFiltrados(data); // Inicialmente, pratos filtrados é igual à lista completa

      } catch (error) {
        console.error("Erro ao carregar itens:", error);
        alert("Não foi possível conectar à API.");
      }
    }

    carregarItens();
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
            setPratosFiltrados(listaPratos);  //se nao houver consulta, mostrar todos os pratos na tela
        }
    }, [searchQuery, listaPratos]); //reexecuta quando a searchQuery ou a listaPratos muda

    
    const changePage = (path, prato) => {
        console.log(prato.mode)
        navigate(path, { state: { prato } });
    }

    return (
        <>
            <div className={styles.listaCards}>
                {/* verifique se a lista de pratos filtrados está vazia*/}
                {pratosFiltrados.length === 0 ? (
                    // se estiver vazia e houver um termo de pesquisa, mostre a mensagem
                    searchQuery && (
                        <p className={styles.textoPratoNaoEncontrado}>Prato não Encontrado!</p>
                    )
                ) : (
                    // se não estiver vazia, mostre a lista de pratos filtrados
                    pratosFiltrados.map((prato) => (
                        <div key={prato.id} className={styles.cardContainer} onClick={() => changePage("/telaprato", prato)}>
                            <img src={prato.imagemUrl} alt={prato.nome} className={styles.cardImage}/>     {/* COLOCAR IMAGEM COMO ATRIBUTO NO BDD */}
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
