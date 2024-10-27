import { useNavigate } from "react-router-dom";
import styles from "./CameraButton.module.css";

function CameraButton() {
    const navigate = useNavigate();
    
    const changePage = (path) => {
        console.log("MUDANDO PARA TelaCamera" + path);
        navigate(path);
    };

    return (
        <div className={styles.cameraButton} onClick={() => changePage("/telacamera")}>
            <img className={styles.cameraIcon} src="src/assets/camera.png" alt="ícone câmera" />
        </div>
    );
}

export default CameraButton;
