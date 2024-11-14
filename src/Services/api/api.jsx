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

export async function buscarAlimento() {
    const response = await fetch('http://localhost:8080/api/personalnutri/alimentos');
    return await response.json();
}

export async function adicionarAlimento(alimento) {
    await fetch('http://localhost:8080/api/personalnutri/alimentos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alimento),
    });
}

export async function editarAlimento(id, alimento) {
    await fetch(`http://localhost:8080/api/personalnutri/alimentos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alimento),
    });
}

export async function deletarAlimento(id) {
    await fetch(`http://localhost:8080/api/personalnutri/alimentos/${id}`, {
        method: 'DELETE',
    });
}