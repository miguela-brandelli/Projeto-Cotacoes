import { useState } from "react";
import axios from "axios";

export default function IndicadorForm({ onCadastro }) {
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });
    setLoading(true);

    console.log("Tentando cadastrar:", { nome, sigla });

    try {
      const response = await axios.post("http://localhost:8080/indicadores", {
        nome,
        sigla,
      });
      console.log("Resposta do servidor:", response.data);
      setNome("");
      setSigla("");
      setMensagem({
        tipo: "sucesso",
        texto: "Indicador cadastrado com sucesso!",
      });
      if (onCadastro) onCadastro();
    } catch (error) {
      console.error("Erro completo:", error);
      if (error.response) {
        console.error("Erro do servidor:", error.response.data);
        setMensagem({
          tipo: "erro",
          texto: `Erro do servidor: ${error.response.data.message || error.response.statusText}`,
        });
      } else if (error.request) {
        console.error("Sem resposta do servidor:", error.request);
        setMensagem({
          tipo: "erro",
          texto:
            "Servidor não respondeu. Verifique se o backend está rodando em http://localhost:8080/indicadores",
        });
      } else {
        console.error("Erro na requisição:", error.message);
        setMensagem({
          tipo: "erro",
          texto: `Erro: ${error.message}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Cadastrar Indicador:</h2>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sigla:</label>
        <input
          type="text"
          value={sigla}
          onChange={(e) => setSigla(e.target.value)}
          required
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}
