import { useState } from "react";
import axios from "axios";

export default function CotacaoForm({ indicadores = [], onCadastro }) {
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [indicadorId, setIndicadorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensagem({ tipo: "", texto: "" });
    setLoading(true);

    const payload = {
      valor: parseFloat(valor),
      data,
      indicadorId: parseInt(indicadorId),
    };

    console.log("Tentando cadastrar cotação:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8080/cotacoes",
        payload,
      );

      console.log("Resposta do servidor:", response.data);
      setValor("");
      setData("");
      setIndicadorId("");

      setMensagem({
        tipo: "sucesso",
        texto: "Cotação cadastrada com sucesso!",
      });

      if (onCadastro) onCadastro();
    } catch (error) {
      console.error("Erro completo:", error);

      if (error.response) {
        console.error("Dados do erro:", error.response.data);
        console.error("Status:", error.response.status);

        const mensagemErro =
          error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data) ||
          error.response.statusText;

        setMensagem({
          tipo: "erro",
          texto: `Erro ${error.response.status}: ${mensagemErro}`,
        });
      } else if (error.request) {
        console.error("Sem resposta do servidor:", error.request);
        setMensagem({
          tipo: "erro",
          texto: "Servidor não respondeu. Verifique se o backend está rodando.",
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
    <div>
      <form onSubmit={handleSubmit} className="formulario">
        <h2>Cadastrar Cotação:</h2>

        {mensagem.texto && (
          <div className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</div>
        )}

        <div>
          <label>Indicador:</label>
          <select
            value={indicadorId}
            onChange={(e) => setIndicadorId(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Selecione</option>
            {Array.isArray(indicadores) &&
              indicadores.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.nome} ({ind.sigla})
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label>Valor:</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <style jsx>{`
        .mensagem {
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .mensagem.sucesso {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .mensagem.erro {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        button:disabled,
        input:disabled,
        select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
