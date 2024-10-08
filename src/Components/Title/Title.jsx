import "./Title.css"

//funcao que retona o header da pagina principal
function Title(){
    return(
        <div id="containerTitle">
            <img id="imagemLogo" src="src/assets/icon.png" alt="Logo Personal Nutri" />
            <h1 id="titlePage">Personal Nutri</h1>
        </div>
    )
};

export default Title;
