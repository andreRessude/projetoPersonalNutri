import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TelaDeveloper.module.css';
import { buscarAlimento, adicionarAlimento, editarAlimento, deletarAlimento } from '../../Services/api/api';

function TelaDeveloper() {
    const [operation, setOperation] = useState('');
    const [alimentoId, setAlimentoId] = useState('');
    const [nome, setNome] = useState('');
    const [lipidios, setLipidios] = useState('');
    const [calorias, setCalorias] = useState('');
    const [fibras, setFibras] = useState('');
    const [cargaGlicemica, setCargaGlicemica] = useState('');
    const [recomendacaoSaudavel, setRecomendacaoSaudavel] = useState('');
    const [imagem, setImagem] = useState(null); // Armazena o arquivo da imagem
    const [alimentos, setAlimentos] = useState([]);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleOperation = (op) => {
        setOperation(op);
        clearForm();
    };

    const clearForm = () => {
        setAlimentoId('');
        setNome('');
        setLipidios('');
        setCalorias('');
        setFibras('');
        setCargaGlicemica('');
        setRecomendacaoSaudavel('');
        setImagem(null);
    };

    const handleGetAlimentos = async () => {
        const response = await buscarAlimento();
        setAlimentos(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        let message = '';

        // Criar form data para enviar a imagem junto aos outros dados
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('lipidios', lipidios);
        formData.append('calorias', calorias);
        formData.append('fibras', fibras);
        formData.append('carga_glicemica', cargaGlicemica);
        if (recomendacaoSaudavel) formData.append('recomendacaoSaudavel', recomendacaoSaudavel);
        

        if (operation === 'adicionar') {
            if (image) {
                await adicionarAlimento(formData);
            }
            // if (imagem){
            //     await adicionarAlimento(formData, imagem)
            //     message = 'Alimento adicionado com sucesso!';
            // } else {
            //     await adicionarAlimento(formData, null); // Envia os dados para o backend
            //     message = 'Alimento adicionado com sucesso!';
            // }
            if (imagem) adicionarAlimento()
        } else if (operation === 'editar') {
            if (imagem){
                await editarAlimento(alimentoId, formData, imagem)
                message = 'Alimento editado com sucesso!';
            } else {
                await editarAlimento(alimentoId, formData, null); // Envia os dados para o backend
                message = 'Alimento editado com sucesso!';
            }
        } else if (operation === 'deletar') {
            await deletarAlimento(alimentoId);
            message = 'Alimento deletado com sucesso!';
        }

        handleGetAlimentos();
        setSuccessMessage(message);
        setShowSuccessModal(true);
        clearForm();
    };

    const changePage = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.developerContainer}>
            <h2>Modo Desenvolvedor</h2>
            
            {/* Botões de Operação */}
            <div className={styles.buttonsContainer}>
                <button className={`${operation === 'mostrar' ? styles.active : ''}`} onClick={() => handleOperation('mostrar')}>
                    Mostrar Alimentos
                </button>
                <button className={`${operation === 'adicionar' ? styles.active : ''}`} onClick={() => handleOperation('adicionar')}>
                    Adicionar Alimento
                </button>
                <button className={`${operation === 'editar' ? styles.active : ''}`} onClick={() => handleOperation('editar')}>
                    Editar Alimento
                </button>
                <button className={`${operation === 'deletar' ? styles.active : ''}`} onClick={() => handleOperation('deletar')}>
                    Deletar Alimento
                </button>
            </div>

            {/* Lista de Alimentos */}
            {operation === 'mostrar' && (
                <div className={styles.alimentosList}>
                    <button onClick={handleGetAlimentos}>Atualizar Lista</button>
                    <ul>
                        {alimentos.map((alimento) => (
                            <li key={alimento.id_alimento}>
                                <p>{alimento.id_alimento}. {alimento.nome}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Formulário para Adicionar/Editar/Deletar */}
            {operation !== 'mostrar' && (
                <form onSubmit={handleSubmit} className={styles.alimentoForm}>
                    {(operation === 'editar' || operation === 'deletar') && (
                        <input
                            type="text"
                            placeholder="ID do Alimento"
                            value={alimentoId}
                            onChange={(e) => setAlimentoId(e.target.value)}
                            required
                        />
                    )}

                    {/* Campos para Adicionar ou Editar */}
                    {(operation === 'adicionar' || operation === 'editar') && (
                        <>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Lipídios"
                                value={lipidios}
                                onChange={(e) => setLipidios(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Calorias"
                                value={calorias}
                                onChange={(e) => setCalorias(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Fibras"
                                value={fibras}
                                onChange={(e) => setFibras(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Carga Glicêmica"
                                value={cargaGlicemica}
                                onChange={(e) => setCargaGlicemica(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Recomendação Saudável"
                                value={recomendacaoSaudavel}
                                onChange={(e) => setRecomendacaoSaudavel(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                placeholder="Imagem Alimento"
                                value={imagem}
                                onChange={(e) => setImagem(e.target.files[0])}
                            />
                        </>
                    )}

                    <button type="submit">
                        {operation.charAt(0).toUpperCase() + operation.slice(1)} Alimento
                    </button>
                </form>
            )}

            {/* Modal de Sucesso */}
            {showSuccessModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>{successMessage}</p>
                        <button onClick={() => setShowSuccessModal(false)}>Fechar</button>
                    </div>
                </div>
            )}

            <button className={styles.botaoVoltar} onClick={() => changePage("/")}>Voltar</button>
        </div>
    );
}

export default TelaDeveloper;
