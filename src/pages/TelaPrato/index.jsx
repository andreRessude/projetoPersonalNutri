import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"; // Importar useState
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

    // Função para retornar a recomendação saudável com base no nome do prato
    const getRecomendacaoSaudavel = (pratoNome) => {
        switch (pratoNome) {
            case 'Estrogonofe de Frango':
                return 'Tente usar iogurte natural em vez de creme de leite para reduzir as calorias.';
            case 'Feijoada':
                return 'Opte por carnes magras e adicione mais legumes para aumentar a quantidade de fibras.';
            case 'Macarrão com Molho de Tomate':
                return 'Use macarrão integral e adicione mais vegetais para enriquecer o prato.';
            default:
                return 'Experimente opções de ingredientes mais saudáveis para este prato.';
        }
    };

    return (
        <Layout>
            <div className={styles.telaAlimentoSelecionado}>
                <img className={styles.imagemPrato} src={prato.imagem} alt="imagem prato" />
                
                {/*titulo e porção do prato*/}
                <div className={styles.containerTelaPrato}>
                    <p className={styles.titulo}>{prato.nome}</p>   
                    <p className={styles.textoPorcao}>--- porção: 300g ---</p>
                </div>
        
                {/*ingredientes*/}
                <div className={styles.containerTelaPrato}>
                    <h2 className={styles.tituloTabela}>Ingredientes</h2>
                    {prato.nome === 'Estrogonofe de Frango' && (
                        <div className={styles.tabela}>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Peito de Frango</p>
                                <p className={styles.textoTabela}>160g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Cebola</p>
                                <p className={styles.textoTabela}>21g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Cogumelo Paris in Natura</p>
                                <p className={styles.textoTabela}>39g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Creme de Leite</p>
                                <p className={styles.textoTabela}>61g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Catchup</p>
                                <p className={styles.textoTabela}>13g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Mostarda</p>
                                <p className={styles.textoTabela}>4g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Óleo</p>
                                <p className={styles.textoTabela}>2g</p>
                            </div>
                        </div>
                    ) || prato.nome === 'Feijoada' && (
                        <div className={styles.tabela}>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Feijão preto</p>
                                <p className={styles.textoTabela}>113g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Orelha de Porco</p>
                                <p className={styles.textoTabela}>13g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Rabo de Porco</p>
                                <p className={styles.textoTabela}>13g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Pé de Porco</p>
                                <p className={styles.textoTabela}>13g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Lombo de Porco</p>
                                <p className={styles.textoTabela}>7g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Costelinha</p>
                                <p className={styles.textoTabela}>13g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Paio</p>
                                <p className={styles.textoTabela}>13g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Linguiça Portuguesa</p>
                                <p className={styles.textoTabela}>20g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Carne Seca</p>
                                <p className={styles.textoTabela}>5g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Cebola</p>
                                <p className={styles.textoTabela}>30g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Alho</p>
                                <p className={styles.textoTabela}>1g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Bacon defumado</p>
                                <p className={styles.textoTabela}>33g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Óleo</p>
                                <p className={styles.textoTabela}>6g</p>
                            </div>
                        </div>
                    ) || prato.nome === 'Macarrão com Molho de Tomate' && (
                        <div className={styles.tabela}>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Macarrão</p>
                                <p className={styles.textoTabela}>250g</p>
                            </div>
                            <div className={styles.linhaTabela}>
                                <p className={styles.textoTabela}>Molho de tomate</p>
                                <p className={styles.textoTabela}>50g</p>
                            </div>
                        </div>
                    )}
                </div>

                {/*valores nutricionais */}
                <div className={styles.containerTelaPrato}>
                    <h2 className={styles.tituloTabela}>Valores Nutricionais</h2>
                    <div className={styles.tabela}>
                        <div className={styles.linhaTabela}>
                            <p className={styles.textoTabela}>Calorias:</p>
                            <p className={styles.textoTabela}>{prato.calorias}kcal</p>
                        </div>
                        <div className={styles.linhaTabela}>
                            <p className={styles.textoTabela}>Lipídios:</p>
                            <p className={styles.textoTabela}>{prato.lipidios}g</p>
                        </div>
                        <div className={styles.linhaTabela}>
                            <p className={styles.textoTabela}>Fibras:</p>
                            <p className={styles.textoTabela}>{prato.fibras}g</p>
                        </div>
                        <div className={styles.linhaTabela}>
                            <p className={styles.textoTabela}>Carga Glicêmica:</p>
                            <p className={styles.textoTabela}>{prato.indiceGlicemico}</p>
                        </div>
                    </div>
                </div>

                {/* botao recomendacao saudavel */}
                <button className={styles.botaoRecomendacao} onClick={() => setShowModal(true)}>
                    Recomendação mais saudável
                </button>

                {/* modal recomendacao saudavel */}
                {showModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>{getRecomendacaoSaudavel(prato.nome)}</p>
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
