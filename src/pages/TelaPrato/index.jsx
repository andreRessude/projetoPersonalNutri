import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import styles from "./telaPrato.module.css";
import Layout from "../../Components/Layout/Layout";

function TelaPrato(props) {
    const location = useLocation(); // define o props como 'prato'
    const navigate = useNavigate(); // agente que muda a página a ser navegada
    const { prato } = location.state || {}; // permite que prato não inicie como undefined

    const [showModal, setShowModal] = useState(false); // state que controla o modal

    const changePage = (path) => {
        navigate(path); // navega para a tela que o 'path' define
    };

    return (
        <Layout>
            <div className={styles.telaAlimentoSelecionado}>
                <img className={styles.imagemPrato} src={prato.imagemUrl} alt="imagem prato" />
                
                {/*titulo e porção do prato*/}
                <div className={styles.containerTelaPrato}>
                    <p className={styles.title}>{prato.nome}</p>   
                    <p className={styles.textPorcao}>--- porção: 300g ---</p>
                </div>

                {/* ingredientes do prato */}
                {(prato.mode) ? (null) : (
                    <div className={styles.containerTelaPrato}>
                        <h2 className={styles.titleTabela}>Ingredientes</h2>
                        {/* lista de ingredientes */}
                    </div>
                )}

                {/*valores nutricionais */}
                <div className={styles.containerTelaPrato}>
                    <h2 className={styles.titleTabela}>Valores Nutricionais</h2>
                    <div className={styles.tabela}>
                        <div className={styles.rowTabela}>
                            <p className={styles.textTabela}>Calorias:</p>
                            <p className={styles.textTabela}>{prato.calorias}kcal</p>
                        </div>
                        <div className={styles.rowTabela}>
                            <p className={styles.textTabela}>Lipídios:</p>
                            <p className={styles.textTabela}>{prato.lipidios}g</p>
                        </div>
                        <div className={styles.rowTabela}>
                            <p className={styles.textTabela}>Fibras:</p>
                            <p className={styles.textTabela}>{prato.fibras}g</p>
                        </div>
                        <div className={styles.rowTabela}>
                            <p className={styles.textTabela}>Carga Glicêmica:</p>
                            <p className={styles.textTabela}>{prato.cargaGlicemica}</p>
                        </div>
                    </div>
                </div>

                {/* botão recomendação saudável */}
                <button className={styles.botaoRecomendacao} onClick={() => setShowModal(true)}>
                    Recomendação mais saudável
                </button>

                {/* modal recomendação saudável */}
                {showModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            {/* Exibindo a recomendação diretamente do prato */}
                            <p dangerouslySetInnerHTML={{ __html: prato.recomendacaoSaudavel }} />
                            <button className={styles.modalVoltar} onClick={() => setShowModal(false)}>Fechar</button>
                        </div>
                    </div>
                )}

                {/*botao voltar*/}
                <button className={styles.botaoVoltar} onClick={() => changePage("/")}>Voltar</button>
            </div>
        </Layout>
    );
}

export default TelaPrato;
