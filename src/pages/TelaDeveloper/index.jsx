import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./TelaDeveloper.module.css";
import { buscarAlimento, buscarAlimentoById } from "../../Services/api/api";

function TelaDeveloper() {
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
    try {
      if (operation === "adicionar" && !mode) {
        // Se for adicionar um prato, incluir os alimentos selecionados
        data.alimentos = alimentosSelecionados;
      }
      console.log("Dados enviados:", data);
      // Aqui você enviaria os dados para a API correspondente
      setSuccessMessage(`Operação "${operation}" realizada com sucesso!`);
      setShowSuccessModal(true);
      reset();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className={styles.developerContainer}>
      <h2>Modo Desenvolvedor</h2>

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
      {operation === "mostrar" && (
        <div className={styles.itensList}>
          <button onClick={handleGetItens}>Atualizar Lista</button>
          <ul>
            {itens.map((item) => (
              <li key={mode ? item.id_alimento : item.id_prato}>
                {mode ? item.id_alimento : item.id_prato}. {item.nome}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FORMULARIO COM REACT HOOK FORM */}
      {operation !== "mostrar" && (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.alimentoForm}>
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
                {...register("imagemURL", {
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
                      {...register("idAlimento")}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        adicionarAlimentoAoPrato(
                          parseInt(document.querySelector("[name='idAlimento']").value)
                        )
                      }
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

      <button className={styles.botaoVoltar} onClick={() => console.log("Voltar para a página anterior")}>
        Voltar
      </button>
    </div>
  );
}

export default TelaDeveloper;
