import styles from "./Title.module.css";

function Title() {
    return (
        <div className={styles.titleContainer}>
            <img className={styles.logo} src="src/assets/icon.png" alt="Logo Personal Nutri"/>  {/*Logo do app*/}
            <h1 className={styles.appTitle}>Personal Nutri</h1> {/*Titulo do app*/}
        </div>
    );
}

export default Title;
