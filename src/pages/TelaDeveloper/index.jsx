//CORRIGR OPERACOES 'ADICIONAR' E 'EDITAR'
//COMENTAR O CODIGO

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './telaDeveloper.module.css';
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
        if (operation === 'adicionar') {
            await adicionarAlimento({ nome, lipidios, calorias, fibras, carga_glicemica: cargaGlicemica });
        } else if (operation === 'editar') {
            await editarAlimento(alimentoId, { nome, lipidios, calorias, fibras, carga_glicemica: cargaGlicemica });
        } else if (operation === 'deletar') {
            await deletarAlimento(alimentoId);
        }
        handleGetAlimentos();
        clearForm();
    };

    const changePage = (path) => {
        navigate(path); // navega para a tela que o 'path' define
    };

    return (
        <div className={styles.developerContainer}>
            <h2>Modo Desenvolvedor</h2>

            <div className={styles.buttonsContainer}>
                <button onClick={() => handleOperation('mostrar')}>Mostrar Alimentos</button>
                <button onClick={() => handleOperation('adicionar')}>Adicionar Alimento</button>
                <button onClick={() => handleOperation('editar')}>Editar Alimento</button>
                <button onClick={() => handleOperation('deletar')}>Deletar Alimento</button>
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
            {/*botao voltar*/}
            <button className={styles.botaoVoltar} onClick={() => changePage("/")}>Voltar</button>
        </div>
    );
}

export default TelaDeveloper;
