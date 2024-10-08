export async function buscarPratos() {
    
    try {
        const response = await fetch('http://192.168.0.34:3000/pratos/'); //COLOCAR SEU ENDERECO IP E RODAR A API NA PORTA 3000
        const text = await response.text(); // Obter resposta como texto
        if (!response.ok) {
        throw new Error(`Erro ao buscar pratos: ${response.status} ${response.statusText}`);
        }
        // const data = await response.json();
        const data = JSON.parse(text); // Converter texto em JSON
        return data;
    } catch (error) {
        console.error('Erro ao buscar pratos:', error);
        throw error;
    }
}
