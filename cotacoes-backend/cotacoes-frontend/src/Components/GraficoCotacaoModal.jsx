import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './GraficoCotacaoModal.css';

const GraficoCotacaoModal = ({ cotacoes, indicadorNome, onClose }) => {
  
  const dadosOrdenados = [...cotacoes].sort((a, b) => new Date(a.data) - new Date(b.data));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Gráfico de {indicadorNome}</h2>

        {cotacoes.length === 0 ? (
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
