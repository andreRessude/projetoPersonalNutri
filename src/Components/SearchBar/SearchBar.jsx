import styles from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
    const handleChange = (event) => {   //funcao chamada qunado o valor do input muda
        onSearch(event.target.value);   //chama a funcao de callback com o valor atual do input
    };

    return (
        <input 
            type='search' 
            className={styles.searchBar} 
            placeholder=' Digite o nome de um prato...' 
            onChange={handleChange} 
        />
    );
}
