import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './GraficoCotacaoModal.css';

const GraficoCotacaoModal = ({ cotacoes, indicadorNome, onClose }) => {
  // Mescla cotações atuais + históricas
  const dadosCompletos = [];

  cotacoes.forEach(cotacao => {
    // Atual
    dadosCompletos.push({
      data: cotacao.data,
      valor: cotacao.valor
    });

    // Históricos
    if (cotacao.historico) {
      cotacao.historico.forEach(hist => {
        dadosCompletos.push({
          data: hist.dataAntiga,
          valor: hist.valorAntigo
        });
      });
    }
  });

  // Ordenar por data
  const dadosOrdenados = dadosCompletos.sort((a, b) => new Date(a.data) - new Date(b.data));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Gráfico de {indicadorNome}</h2>

        {dadosOrdenados.length === 0 ? (
          <p>Não há cotações disponíveis para este indicador.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosOrdenados}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#4caf50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}

        <div className="botoes-modal">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default GraficoCotacaoModal;
