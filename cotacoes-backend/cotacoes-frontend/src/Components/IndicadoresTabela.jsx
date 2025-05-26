import { useEffect, useState } from 'react';
import axios from 'axios';

const IndicadorTabela = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/indicadores-com-cotacoes")
      .then(res => setDados(res.data))
      .catch(err => console.error("Erro ao buscar dados", err));
  }, []);

  const handleEditar = (indicadorId, cotacao) => {
    // Aqui você pode abrir um modal ou formulário com os dados
    console.log("Editar:", indicadorId, cotacao);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Indicadores e Cotações</h2>
      <table className="w-full table-auto border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-700">
            <th className="border px-4 py-2">Indicador</th>
            <th className="border px-4 py-2">Sigla</th>
            <th className="border px-4 py-2">Data</th>
            <th className="border px-4 py-2">Valor</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((indicador, i) =>
            indicador.cotacoes.map((cotacao, j) => (
              <tr key={`${i}-${j}`} className="bg-gray-800">
                <td className="border px-4 py-2">{indicador.nome}</td>
                <td className="border px-4 py-2">{indicador.sigla}</td>
                <td className="border px-4 py-2">{cotacao.data}</td>
                <td className="border px-4 py-2">R$ {cotacao.valor}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditar(indicador.id, cotacao)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IndicadorTabela;
