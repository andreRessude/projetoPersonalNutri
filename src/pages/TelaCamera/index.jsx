import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./telaCamera.module.css";

function TelaCamera() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null); // Estado para armazenar a imagem

    // Função para lidar com a seleção do arquivo
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
        if (file && file.type.startsWith('image/')) { // Verifica se é uma imagem
            const imageUrl = URL.createObjectURL(file); // Cria um URL para o arquivo
            setImage(imageUrl); // Atualiza o estado com o URL da imagem
        } else {
            alert("Por favor, selecione um arquivo de imagem válido."); // Alerta se não for imagem
        }
    };

    const clearImage = () => {
        setImage(null); // Limpa a imagem
    };
    
    return (
        <div className={styles.containerCamera}>
            <div className={styles.telaCamera}>
                {image ? (
                    <img src={image} alt="foto tirada" className={styles.imagePreviewImg} style={{ maxWidth: '100%', maxHeight: '400px' }}/>
                ) : (
                    <p className={styles.textPlaceholder}>Selecione uma imagem do seu dispositivo</p>
                )}
            </div>

            <div className={styles.buttonsContainer}>
                <label htmlFor="fileInput" className={styles.photoButton}>Selecionar Imagem</label>
                <input 
                    id="fileInput" 
                    type="file" 
                    accept="image/*" 
                    className={styles.fileInput} 
                    onChange={handleFileChange} 
                />

                {image && (
                    <button className={styles.clearButton} onClick={clearImage}>Limpar Imagem</button>
                )}

                <button className={styles.clearButton} onClick={() => navigate("/")}>VOLTAR</button>
            </div>
        </div>
    );
}

export default TelaCamera;