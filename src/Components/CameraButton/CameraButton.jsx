import { useNavigate, useLocation } from "react-router-dom";
import "./cameraButton.css"

function CameraButton(){
    const navigate = useNavigate();
    
    const changePage = (path) => {
        console.log("TO AQUI"+path)
        navigate(path); //navega para a tela que o 'path' define
    }

    return(
        <div class="containerBotaoCamera">
            <img class="iconeCamera" src="src/assets/camera.png" alt="ícone câmera" onClick={()=>{changePage("/telacamera")}}/>
        </div>
    );
};

export default CameraButton;