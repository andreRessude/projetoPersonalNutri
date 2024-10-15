import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./telaCamera.css";

function TelaCamera() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null); // Estado para armazenar a imagem

    // Função para lidar com a seleção do arquivo
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Cria um URL para o arquivo
            setImage(imageUrl); // Atualiza o estado com o URL da imagem
        }
    };
    
    return (
        <div className="containerCamera">
            <div id="telaCamera">
                {image ? (
                    <img src={image} alt="foto tirada" className="image-preview__img"/>
                ) : (
                    <p>Tire uma foto</p>
                )}
            </div>

            <div id="botoes">
                <label htmlFor="botaoCamera" className="photo-button">Tirar Foto</label>
                <input id="botaoCamera" type="file" accept="image/*" class="botaoCamera" onChange={handleFileChange}/>

                <button className="botaoVoltar" onClick={() => navigate("/")}>VOLTAR</button>
            </div>
        </div>
    );
}

export default TelaCamera;
