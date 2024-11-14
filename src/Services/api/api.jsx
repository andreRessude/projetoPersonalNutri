export async function buscarPratos() {
    try {
        const response = await fetch('http://localhost:8080/api/personalnutri/alimentos'); //ENDPOINT DO BANCO DE DADOS
        const text = await response.text(); // Obter resposta como texto
        if (!response.ok) {
            throw new Error(`Erro ao buscar pratos: ${response.status} ${response.statusText}`);
        }
        const data = JSON.parse(text); // converter texto em JSON
        return data;
    } catch (error) {
        console.error('Erro ao buscar pratos:', error);
        throw error;
    }
}
