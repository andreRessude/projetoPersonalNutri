//CORRIGR OPERACOES 'ADICIONAR' E 'EDITAR'
//COMENTAR O CODIGO

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
    };

    const handleGetAlimentos = async () => {
        const response = await buscarAlimento();
        setAlimentos(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let message = '';
        
        if (operation === 'adicionar') {
            await adicionarAlimento({ nome, lipidios, calorias, fibras, carga_glicemica: cargaGlicemica });
            message = 'Alimento adicionado com sucesso!';
        } else if (operation === 'editar') {
            await editarAlimento(alimentoId, { nome, lipidios, calorias, fibras, carga_glicemica: cargaGlicemica });
            message = 'Alimento atualizado com sucesso!';
        } else if (operation === 'deletar') {
            await deletarAlimento(alimentoId);
            message = 'Alimento deletado com sucesso!';
        }
        
        handleGetAlimentos();
        setSuccessMessage(message);
        setShowSuccessModal(true); // Mostra o modal de sucesso
        clearForm();
    };

    const changePage = (path) => {
        navigate(path); // navega para a tela que o 'path' define
    };

    return (
        <div className={styles.developerContainer}>
            <h2>Modo Desenvolvedor</h2>
            
            {/* BOTOES CRUD */}
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

            {/* GET */}
            {operation === 'mostrar' && (
                <div className={styles.alimentosList}>
                    <button onClick={handleGetAlimentos}>Atualizar Lista</button>
                    <ul>
                        {alimentos.map((alimento) => (
                            <li key={alimento.id_alimento}>
                                {alimento.id_alimento}. {alimento.nome}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* PUT ou DELETE */}
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

                    {/* POST ou PUT */}
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
                        </>
                    )}

                    {/* SUBMIT */}
                    <button type="submit">
                        {operation.charAt(0).toUpperCase() + operation.slice(1)} Alimento
                    </button>
                </form>
            )}

            {/* MODAL DE SUCESSO */}
            {showSuccessModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>{successMessage}</p>
                        <button onClick={() => setShowSuccessModal(false)}>Fechar</button>
                    </div>
                </div>
            )}

            {/*VOLTAR*/}
            <button className={styles.botaoVoltar} onClick={() => changePage("/")}>Voltar</button>
        </div>
    );
}

export default TelaDeveloper;
