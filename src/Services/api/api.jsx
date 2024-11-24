// export async function buscarPratos() {
//     try {
//         const response = await fetch('http://localhost:8080/api/personalnutri/alimentos'); //ENDPOINT DO BANCO DE DADOS
//         const text = await response.text(); // Obter resposta como texto
//         if (!response.ok) {
//             throw new Error(`Erro ao buscar pratos: ${response.status} ${response.statusText}`);
//         }
//         const data = JSON.parse(text); // converter texto em JSON
//         return data;
//     } catch (error) {
//         console.error('Erro ao buscar pratos:', error);
//         throw error;
//     }
// }

//Endpoint GET
export async function buscarAlimento() {
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

//Endpoint POST
// Arrumar essa entrada de dados da funcao
export async function adicionarAlimento(alimento) {
    try {
        const response = await fetch('http://localhost:8080/api/personalnutri/alimentos', {
            method: 'POST',
            body: alimento, // FormData já lida com o formato de envio
        });
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.log(alimento);
        console.error("ERRO AO ADICIONAR ALIMENTO:", error);
        throw error;
    }
}


//Endpoint PUT
export async function editarAlimento(id, alimento) {
    try {
        const response = await fetch(`http://localhost:8080/api/personalnutri/alimentos/${id}`, {
            method: 'PUT',
            body: alimento,
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao editar alimento:", error);
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
