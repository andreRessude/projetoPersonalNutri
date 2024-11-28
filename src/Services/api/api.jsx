//Endpoint GET
export async function buscarAlimento() { // Geral
    try {
        const response = await fetch('http://localhost:8080/api/personalnutri/alimentos');
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("ERRO AO BUSCAR ALIMENTOS:", error);
        return { error: 'Não foi possível buscar os alimentos.' };
    }
}
export async function buscarAlimentoById(id) { // ID
    try {
        const response = await fetch(`http://localhost:8080/api/personalnutri/alimentos/${id}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("ERRO AO BUSCAR ALIMENTOS:", error);
        return { error: 'Não foi possível buscar os alimentos.' };
    }
}
export async function buscarPrato() { // Geral
    try {
        const response = await fetch('http://localhost:8080/api/personalnutri/pratos');
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("ERRO AO BUSCAR PRATOS:", error);
        return { error: 'Não foi possível buscar os pratos.' };
    }
}
export async function buscarPratoById(id) { // ID
    try {
        const response = await fetch(`http://localhost:8080/api/personalnutri/pratos/${id}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("ERRO AO BUSCAR PRATOS:", error);
        return { error: 'Não foi possível buscar os pratos.' };
    }
}

//Endpoint POST
export async function adicionarAlimento(alimento) {
    try {
        const response = await fetch('http://localhost:8080/api/personalnutri/alimentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alimento),
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
export async function adicionarPrato(prato, idAlimentos) {
    try {
        console.log(prato);
        const response = await fetch('http://localhost:8080/api/personalnutri/pratos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prato, idAlimentos),
        });
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.log(JSON.stringify(prato))
        console.error("ERRO AO ADICIONAR ALIMENTO:", error);
        throw error;
    }
}

//Endpoint PUT
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
        return { success: true, message: 'Alimento editado com sucesso.' };
    } catch (error) {
        console.error("Erro ao editar alimento:", error);
        throw error;
    }
}
export async function editarPrato(id, prato) {
    try {
        const response = await fetch(`http://localhost:8080/api/personalnutri/pratos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prato),
        });
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return { success: true, message: 'Prato editado com sucesso.'};
    } catch (error) {
        console.error("Erro ao editar prato:", error);
        throw error;
    }
}

//Endpoint DELETE
export async function deletarAlimento(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/personalnutri/alimentos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return { success: true, message: 'Alimento deletado com sucesso.' };
    } catch (error) {
        console.error("ERRO AO DELETAR ALIMENTO:", error);
        return { success: false, error: 'Não foi possível deletar o alimento.' };
    }
}

export async function deletarPrato(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/personalnutri/pratos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return { success: true, message: 'Prato deletado com sucesso.'};
    } catch (error) {
        console.error("ERRO AO DELETAR PRATO:", error);
        return { success: false, error: 'Não foi possível deletar o prato.' };
    }
}
