import { useLocation, useNavigate } from "react-router-dom";
import styles from "./telaPrato.module.css";
import Layout from "../../Components/Layout/Layout";

function TelaPrato(props) {
    const location = useLocation(); // define o props como 'prato'
    const navigate = useNavigate(); // agente que muda a página a ser navegada
    const { prato } = location.state || {}; // permite que prato não inicie como undefined

    const changePage = (path) => {
        navigate(path); // navega para a tela que o 'path' define
    };

    return (
        <Layout>
            <div className={styles.telaAlimentoSelecionado}>
                <img className={styles.imagemPrato} src={prato.imagem} alt="imagem prato" />
                
                <div className={styles.containerTelaPrato}>
                    <p className={styles.titulo}>{prato.nome}</p>
                    <p className={styles.textoPorcao}>--- porção: 300g ---</p>
                </div>
        
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

                <button className={styles.botaoVoltar} onClick={() => changePage("/")}>Voltar</button>
            </div>
        </Layout>
    );
}

export default TelaPrato;
