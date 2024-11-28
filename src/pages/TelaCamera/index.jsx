import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./telaCamera.module.css";
import Layout from "../../Components/Layout/Layout";
import ImageClassifier from "../../Components/ImageClassifier/ImageClassifier";
import { buscarPrato } from "../../Services/api/api";    //CAMINHO PARA A FUNCAO 'BUSCARALIMENTO' NA API.JSX 

function TelaCamera() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [identifiedDish, setIdentifiedDish] = useState(null); // armazen o prato identificado

    // funcao para manipular o selecionar de fotos
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setIdentifiedDish(null); // reseta o prato identificado ao carregar nova imagem
        } else {
            alert("Por favor, selecione um arquivo de imagem válido.");
        }
    };

    // funcao chamada quando o prato é identificado
    const handleDishIdentified = async (dishName) => {
        const pratos = await buscarPrato(); // busca pratos da api
        const normalizeString = (str) => str.toLowerCase().trim(); // Normaliza strings para comparação

        const pratoEncontrado = pratos.find(
            (prato) => normalizeString(prato.nome) === normalizeString(dishName)
        );

        if (pratoEncontrado) {
            setIdentifiedDish(pratoEncontrado);
        } else {
            alert("Prato não encontrado na API.");
        }
    };

    // funcao limpar imagem
    const clearImage = () => {
        setImage(null);
        setIdentifiedDish(null);
    };

    return (
        <Layout>
            <div className={styles.containerCamera}>
                <div className={styles.telaCamera}>
                    {image ? (
                        <img
                            src={image}
                            alt="foto tirada"
                            className={styles.imagePreviewImg}
                            style={{ maxWidth: "100%", maxHeight: "400px" }}
                        />
                    ) : (
                        <p className={styles.textPlaceholder}>
                            Selecione uma imagem do seu dispositivo
                        </p>
                    )}
                </div>

                {/* componente q recebe a imagem e a função de callback */}
                <ImageClassifier image={image} onDishIdentified={handleDishIdentified} />

                {/* botap para ir à telaPrato se um prato for identificado */}
                {identifiedDish && (
                    <button
                        className={styles.detailsButton}
                        onClick={() => navigate("/telaprato", { state: { prato: identifiedDish } })}
                    >
                        Ver Detalhes do Prato
                    </button>
                )}

                <div className={styles.buttonsContainer}>
                    <label htmlFor="fileInput" className={styles.photoButton}>
                        Selecionar Imagem
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={handleFileChange}
                    />

                    {/* botao para limpar a imagem */}
                    {image && (
                        <button className={styles.clearButton} onClick={clearImage}>
                            Limpar Imagem
                        </button>
                    )}

                    <button className={styles.botaoVoltar} onClick={() => navigate("/")}>
                        VOLTAR
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default TelaCamera;
