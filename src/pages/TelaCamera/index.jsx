// src/pages/TelaCamera/index.jsx

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./telaCamera.module.css";
import Layout from "../../Components/Layout/Layout";
import ImageClassifier from "../../Components/ImageClassifier/ImageClassifier";

function TelaCamera() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Função para lidar com a seleção do arquivo
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        } else {
            alert("Por favor, selecione um arquivo de imagem válido.");
        }
    };

    const clearImage = () => {
        setImage(null);
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

                {/* Componente ImageClassifier recebe a imagem como prop */}
                <ImageClassifier image={image} />

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

                    {image && (
                        <button className={styles.clearButton} onClick={clearImage}>
                            Limpar Imagem
                        </button>
                    )}

                    <button className={styles.clearButton} onClick={() => navigate("/")}>
                        VOLTAR
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default TelaCamera;
