import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./TelaDeveloper.module.css";
import { buscarAlimento, buscarAlimentoById, adicionarAlimento, editarAlimento, deletarAlimento,
          buscarPrato, buscarPratoById, adicionarPrato, editarPrato, deletarPrato } from "../../Services/api/api";
import { useNavigate } from "react-router-dom";

function TelaDeveloper() {
  const navigate = useNavigate();
  const [idAlimento, setIdAlimento] = useState("");
  const [operation, setOperation] = useState("");
  const [mode, setMode] = useState(true); // true = alimento, false = prato
  const [alimentosSelecionados, setAlimentosSelecionados] = useState([]); // Lista de IDs de alimentos para o prato
  const [itens, setItens] = useState([]); // Lista de itens a serem exibidos na operação "mostrar"
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOperation = (op) => {
    setOperation(op);
    reset();
    setAlimentosSelecionados([]); // Limpar a lista de IDs de alimentos ao mudar de operação
  };

  const adicionarAlimentoAoPrato = async (id) => {
    if (id && !alimentosSelecionados.includes(id)) {
      try {
        // Aqui usamos await para esperar o retorno da busca
        const alimento = await buscarAlimentoById(id);
  
        // Verifique se o alimento foi encontrado (ou se é um erro)
        if (alimento && !alimento.error) {
          // Alimento encontrado, adicione à lista

          setAlimentosSelecionados([...alimentosSelecionados, id]);
        } else {
          console.error("Alimento não encontrado:", id);
        }
      } catch (error) {
        console.error("Erro ao buscar alimento:", error);
      }
    }
  };

  const removerAlimentoDoPrato = (id) => {
    setAlimentosSelecionados(alimentosSelecionados.filter((item) => item !== id));
  };

  const handleGetItens = async () => {
    try {
      // Aqui você deve chamar a API que busca alimentos ou pratos
      const data = mode
        ? await buscarAlimento() // Busca alimentos
        : await buscarPrato(); // Busca pratos
      setItens(data);
    } catch (error) {
      alert("Erro ao buscar itens.");
    }
  };

  const onSubmit = async (data) => {
    console.log(alimentosSelecionados)
    try {
      let message = "";
      const itemId = data.deleteId;
      const newAlimento = {
        nome: data.nome,
        lipidios: parseFloat(data.lipidios),
        calorias: parseFloat(data.calorias),
        fibras: parseFloat(data.fibras),
        cargaGlicemica: parseFloat(data.cargaGlicemica),
        recomendacaoSaudavel: data.recomendacaoSaudavel,
        imagemUrl: data.imagemUrl,
        mode: mode,
      };
      const newPrato = {
        nome: data.nome,
        lipidios: parseFloat(data.lipidios),
        calorias: parseFloat(data.calorias),
        fibras: parseFloat(data.fibras),
        cargaGlicemica: parseFloat(data.cargaGlicemica),
        recomendacaoSaudavel: data.recomendacaoSaudavel,
        imagemUrl: data.imagemUrl,
        mode: mode,
        idAlimento: alimentosSelecionados,
      };
      if (operation === "adicionar") {
        if (mode) {
          await adicionarAlimento(newAlimento);
          message = "Alimento adicionado com sucesso!";
        } else {
          await adicionarPrato(newPrato);
          message = "Prato adicionado com sucesso!";
        }
      } else if (operation === "editar") {
        if (mode) {
          await editarAlimento(itemId, newAlimento);
          message = "Alimento atualizado com sucesso!";
        } else {
          await editarPrato(itemId, newPrato);
          message = "Prato atualizado com sucesso!";
        }
      } else if (operation === "deletar") {
        if (mode) {
          await deletarAlimento(itemId);
          message = "Alimento deletado com sucesso!";
        } else {
          await deletarPrato(itemId);
          message = "Prato deletado com sucesso!";
        }
      }

      handleGetItens();
      setSuccessMessage(message);
      setShowSuccessModal(true);
      reset();
    } catch (error) {
      console.error("Erro ao realizar a operação:", error);
    }
  };

  return (
    <div className={styles.developerContainer}>
      <h2>Modo Desenvolvedor</h2>

      {/* Botões alimento/prato */}
      <div className={styles.buttonsMode}>
        <button
          className={`${mode === true ? styles.active : ""}`}
          onClick={() => setMode(true)}
        >
          Alimento
        </button>
        <button
          className={`${mode === false ? styles.active : ""}`}
          onClick={() => setMode(false)}
        >
          Prato
        </button>
      </div>

      {/* Botões CRUD */}
      <div className={styles.buttonsContainer}>
        <button
          className={`${operation === "mostrar" ? styles.active : ""}`}
          onClick={() => handleOperation("mostrar")}
        >
          Mostrar {mode ? "Alimento" : "Prato"}
        </button>
        <button
          className={`${operation === "adicionar" ? styles.active : ""}`}
          onClick={() => handleOperation("adicionar")}
        >
          Adicionar {mode ? "Alimento" : "Prato"}
        </button>
        <button
          className={`${operation === "editar" ? styles.active : ""}`}
          onClick={() => handleOperation("editar")}
        >
          Editar {mode ? "Alimento" : "Prato"}
        </button>
        <button
          className={`${operation === "deletar" ? styles.active : ""}`}
          onClick={() => handleOperation("deletar")}
        >
          Deletar {mode ? "Alimento" : "Prato"}
        </button>
      </div>

      {/* GET */}
      {(operation === "mostrar" && mode === true) && (
        <div className={styles.itensList}>
          <button onClick={handleGetItens}>Atualizar Lista</button>
          <ul>
            {itens.map((item) => (
                <li key={item.id_alimento}>
                    {item.id_alimento}. {item.nome}
                </li>
            ))}
          </ul>
        </div>
      )}
      {(operation === "mostrar" && mode === false) && (
        <div className={styles.itensList}>
          <button onClick={handleGetItens}>Atualizar Lista</button>
          <ul>
            {itens.map((item) => (
                <li key={item.id_prato}>
                    {item.id_prato}. {item.nome}
                </li>
            ))}
          </ul>
        </div>
      )}

      {/* FORMULARIO COM REACT HOOK FORM */}
      {operation !== "mostrar" && (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.alimentoForm}>
          {(operation === "editar" || operation === "deletar") && (
            <div>
            <input
              type="text"
              placeholder={`ID do ${mode ? "Alimento" : "Prato"}`}
              {...register("deleteId" , { required: `ID do ${mode ? "Alimento" : "Prato"} é necessário` })}
            />
            {errors.alimentoId && <p style={{ color: "red" }}>{errors.alimentoId.message}</p>}
            {errors.pratoId && <p style={{ color: "red" }}>{errors.pratoId.message}</p>}
            </div>
          )}
          {(operation === "adicionar" || operation === "editar") && (
            <>
              <input
                type="text"
                placeholder="Nome"
                {...register("nome", { required: "Nome é obrigatório" })}
              />
              {errors.nome && <p style={{ color: "red" }}>{errors.nome.message}</p>}

              <input
                type="number"
                placeholder="Lipídios"
                {...register("lipidios", { required: "Lipídios são obrigatórios" })}
              />
              {errors.lipidios && <p style={{ color: "red" }}>{errors.lipidios.message}</p>}

              <input
                type="number"
                placeholder="Calorias"
                {...register("calorias", { required: "Calorias são obrigatórias" })}
              />
              {errors.calorias && <p style={{ color: "red" }}>{errors.calorias.message}</p>}

              <input
                type="number"
                placeholder="Fibras"
                {...register("fibras", { required: "Fibras são obrigatórias" })}
              />
              {errors.fibras && <p style={{ color: "red" }}>{errors.fibras.message}</p>}

              <input
                type="number"
                placeholder="Carga Glicêmica"
                {...register("cargaGlicemica", { required: "Carga Glicêmica é obrigatória" })}
              />
              {errors.cargaGlicemica && <p style={{ color: "red" }}>{errors.cargaGlicemica.message}</p>}

              <input
                type="text"
                placeholder="Recomendação Saudável"
                {...register("recomendacaoSaudavel")}
              />

              <input 
                type="url"
                placeholder="URL da imagem"
                {...register("imagemUrl", {
                    pattern: {
                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                        message: "URL da imagem inválido",
                    },
                })} 
              />

              {!mode && (
                <>
                  <h3>Adicionar Alimentos ao Prato</h3>
                  <div>
                    <input
                      type="number"
                      placeholder="ID do Alimento"
                      value={idAlimento} // Valor controlado pelo estado
                      onChange={(e) => setIdAlimento(e.target.value)} // Atualiza o estado
                    />
                    <button
                      type="button"
                      onClick={() => adicionarAlimentoAoPrato(parseInt(idAlimento))}
                    >
                      Adicionar Alimento
                    </button>
                  </div>

                  <ul>
                    {alimentosSelecionados.map((id) => (
                      <li key={id}>
                        ID Alimento: {id}{" "}
                        <button type="button" onClick={() => removerAlimentoDoPrato(id)}>
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}

          <button type="submit">
            {operation.charAt(0).toUpperCase() + operation.slice(1)} {mode ? "Alimento" : "Prato"}
          </button>
        </form>
      )}

      {showSuccessModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>{successMessage}</p>
            <button onClick={() => setShowSuccessModal(false)}>Fechar</button>
          </div>
        </div>
      )}

      <button className={styles.botaoVoltar} onClick={() => navigate("/")}>
        Voltar
      </button>
    </div>
  );
}

export default TelaDeveloper;
