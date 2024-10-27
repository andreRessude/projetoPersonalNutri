import styles from "./Layout.module.css";

function Layout({ children }) { //recebe o que irá ter na página
    return (
        <>
            <div className={styles.layoutContainer}>
                <header className={styles.header}>
                    <h1 className={styles.textoHeader}>Personal Nutri</h1>
                    {/* <img className={styles.imagemHeader} src="/src/assets/icon.png" alt="logo aplicativo" /> */}
                </header>
                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
        </>
    );
}

export default Layout;
