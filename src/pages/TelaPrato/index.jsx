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

    // funcao para retornar a recomendaçao saudavel com base no nome do prato
    const getRecomendacaoSaudavel = (pratoNome) => {
        switch (pratoNome) {
            case 'Estrogonofe de Frango':
                return 'O estrogonofe de frango se preparado da maneira mostrada possui um alto teor de gordura e baixa quantidade de fibras. Para melhor se adequar as necessidades do diabético aconselha-se as seguintes atitudes: <br><br>'+    

                '<b>Trocar o creme leite normal pela opção light,</b> que tem quase 6g de lipídios a menos pela porção descrita do prato. <br>'+
                'Ou mesmo <b>iogurte grego sem açúcar</b>, que torna o estrogonofe menos gorduroso, pois contém 5,28g de lipídios pela mesma quantidade de porção.';
            
            case 'Feijoada':
                return 'Como a feijoada preparada da maneira mostrada, tende ser uma refeição com alto teor de gordura (lipídios), é aconselhável as seguintes medidas:<br><br>'
                +
                '<b>Retirar o Bacon defumado, Rabo de Porco e Paio</b> devido a grande quantidade de gordura contidas em tais ingredientes, além de se tentar <b>preparar a refeição com uma menor quantidade de óleo.</b> <br><br>'+
                '(Em compensação, se achar necessário pode-se <br>dobrar a quantidade de carne seca</b> utilizada no preparo).';
            
            case 'Macarrão com Molho de Tomate':
                return 'O macarrão com molho de tomate tende a ser não aconselhável para o consumo do diabético, porém uma forma de consumi-lo de maneira mais adequada é: <br><br>'
                +
                '<b>Substituir por macarrão integral</b>, por ter uma quantidade maior de fibras e dar uma maior saciedade, o que se entende por consumir uma menor porção. Além do tipo de carboidrato contido no macarrão integral que demoram mais tempo para ser absorvidos, dando maior saciedade. <br><br>'+
                'Mas <b>lembre-se</b> que mesmo assim <b>o macarrão não é uma comida muito adequada</b>, pois tem alto índice glicêmico e baixo teor de fibras, se for possível trocar por outro alimento é melhor.';
        }
    };

    return (
        <Layout>
            <div className={styles.telaAlimentoSelecionado}>
                <img className={styles.imagemPrato} src={prato.imagem} alt="imagem prato" />
                
                {/*titulo e porção do prato*/}
                <div className={styles.containerTelaPrato}>
                    <p className={styles.title}>{prato.nome}</p>   
                    <p className={styles.textPorcao}>--- porção: 300g ---</p>
                </div>
        
                {/*ingredientes*/}
                <div className={styles.containerTelaPrato}>
                    <h2 className={styles.titleTabela}>Ingredientes</h2>
                    {prato.nome === 'Estrogonofe de Frango' && (
                        <div className={styles.tabela}>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Peito de Frango</p>
                                <p className={styles.textTabela}>160g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Cebola</p>
                                <p className={styles.textTabela}>21g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Cogumelo Paris in Natura</p>
                                <p className={styles.textTabela}>39g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Creme de Leite</p>
                                <p className={styles.textTabela}>61g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Catchup</p>
                                <p className={styles.textTabela}>13g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Mostarda</p>
                                <p className={styles.textTabela}>4g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Óleo</p>
                                <p className={styles.textTabela}>2g</p>
                            </div>
                        </div>
                    ) || prato.nome === 'Feijoada' && (
                        <div className={styles.tabela}>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Feijão preto</p>
                                <p className={styles.textTabela}>113g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Orelha de Porco</p>
                                <p className={styles.textTabela}>13g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Rabo de Porco</p>
                                <p className={styles.textTabela}>13g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Pé de Porco</p>
                                <p className={styles.textTabela}>13g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Lombo de Porco</p>
                                <p className={styles.textTabela}>7g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Costelinha</p>
                                <p className={styles.textTabela}>13g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Paio</p>
                                <p className={styles.textTabela}>13g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Linguiça Portuguesa</p>
                                <p className={styles.textTabela}>20g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Carne Seca</p>
                                <p className={styles.textTabela}>5g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Cebola</p>
                                <p className={styles.textTabela}>30g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Alho</p>
                                <p className={styles.textTabela}>1g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Bacon defumado</p>
                                <p className={styles.textTabela}>33g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Óleo</p>
                                <p className={styles.textTabela}>6g</p>
                            </div>
                        </div>
                    ) || prato.nome === 'Macarrão com Molho de Tomate' && (
                        <div className={styles.tabela}>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Macarrão</p>
                                <p className={styles.textTabela}>250g</p>
                            </div>
                            <div className={styles.rowTabela}>
                                <p className={styles.textTabela}>Molho de tomate</p>
                                <p className={styles.textTabela}>50g</p>
                            </div>
                        </div>
                    )}
                </div>

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
                            <p className={styles.textTabela}>{prato.carga_glicemica}</p>
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
                            <p dangerouslySetInnerHTML={{ __html: getRecomendacaoSaudavel(prato.nome) }} />
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
