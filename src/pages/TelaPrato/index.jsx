import { useLocation, useNavigate } from "react-router-dom";
import "./telaPrato.css"

function TelaPrato(props){
    
    const location = useLocation(); //define o props como 'prato'
    const navigate = useNavigate(); //agente que muda a pagina a ser navegada
    const { prato } = location.state || {}; //permite que prato nao inicie como undefined
    
    const changePage = (path) => {
        navigate(path); //navega para a tela que o 'path' define
    }

    return(
        <>
            <div class="telaAlimentoSelecionado">
                <img class="imagemPrato" src={prato.imagem} alt="imagem prato" />
                
                <div class="containerTelaPrato">
                    <p class="titulo"> {prato.nome} </p>
                    <p class="textoPorcao"> --- porção: 300g --- </p>
                </div>
        
                <div className="containerTelaPrato">
                    <h2 class="tituloTabela"> Ingredientes </h2>
                    {prato.nome === 'Estrogonofe de Frango' &&(
                        <div class="tabela">
                            <div class="linhaTabela">
                                <p class="textoTabela"> Peito de Frango</p>
                                <p class="textoTabela"> 160g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Cebola </p>
                                <p class="textoTabela"> 21g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Cogumelo Paris in Natura </p>
                                <p class="textoTabela"> 39g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Creme de Leite</p>
                                <p class="textoTabela"> 61g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Catchup </p>
                                <p class="textoTabela"> 13g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Mostarda </p>
                                <p class="textoTabela"> 4g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Óleo </p>
                                <p class="textoTabela"> 2g </p>
                            </div>
                        </div>
                    ) || prato.nome === 'Feijoada' &&(
                        <div class="tabela">
                            <div class="linhaTabela">
                                <p class="textoTabela"> Feijão preto</p>
                                <p class="textoTabela"> 113g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Orelha de Porco</p>
                                <p class="textoTabela"> 13g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Rabo de Porco</p>
                                <p class="textoTabela"> 13g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Pé de Porco</p>
                                <p class="textoTabela"> 13g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Lombo de Porco</p>
                                <p class="textoTabela"> 7g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Costelinha</p>
                                <p class="textoTabela"> 13g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Paio</p>
                                <p class="textoTabela"> 13g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Linguiça Portuguesa </p>
                                <p class="textoTabela"> 20g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Carne Seca </p>
                                <p class="textoTabela"> 5g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Cebola </p>
                                <p class="textoTabela"> 30g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Alho </p>
                                <p class="textoTabela"> 1g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Bacon defumado </p>
                                <p class="textoTabela"> 33g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Óleo </p>
                                <p class="textoTabela"> 6g </p>
                            </div>
                        </div>
                    ) || prato.nome === 'Macarrão com Molho de Tomate' &&(
                        <div class="tabela">
                            <div class="linhaTabela">
                                <p class="textoTabela"> Macarrão </p>
                                <p class="textoTabela"> 250g </p>
                            </div>
                            <div class="linhaTabela">
                                <p class="textoTabela"> Molho de tomate </p>
                                <p class="textoTabela"> 50g </p>
                            </div>
                        </div>
                    )
                    }
                </div>

                <div class="containerTelaPrato">
                    <h2 class="tituloTabela"> Valores Nutricionais </h2>
                    <div class="tabela">
                        <div class="linhaTabela">
                            <p class="textoTabela"> Calorias: </p>
                            <p class="textoTabela"> {prato.calorias}kcal </p>
                        </div>
                        <div class="linhaTabela">
                            <p class="textoTabela"> Lipídios: </p>
                            <p class="textoTabela"> {prato.lipidios}g </p>
                        </div>
                        <div class="linhaTabela">
                            <p class="textoTabela"> Fibras: </p>
                            <p class="textoTabela"> {prato.fibras}g </p>
                        </div>
                        <div class="linhaTabela">
                            <p class="textoTabela"> Carga Glicêmica: </p>
                            <p class="textoTabela"> {prato.indiceGlicemico} </p>
                        </div>
                    </div>
                </div>


                <button class="botaoVoltar" onClick={()=>{changePage("/")}}> Voltar </button>
            </div>
        </>
    )
}

export default TelaPrato;