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

//ERRO NAS ENDPOINTS 'POST' E 'PUT'
export async function adicionarAlimento(alimento) {
    try {
        const response = await fetch('http://localhost:8080/api/personalnutri/alimentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alimento), //escreve o json corretamente
        });
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.log(JSON.stringify(alimento))
        console.error("ERRO AO ADICIONAR ALIMENTO:", error);
        throw error;
    }
}

export async function editarAlimento(id, alimento) {
    try {
        const response = await fetch(`http://localhost:8080/api/personalnutri/alimentos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alimento),
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Erro ao editar alimento:", error);
        throw error;
    }
}


export async function deletarAlimento(id) {
    await fetch(`http://localhost:8080/api/personalnutri/alimentos/${id}`, {
        method: 'DELETE',
    });
}