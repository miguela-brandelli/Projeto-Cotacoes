import { useState } from 'react';
import axios from 'axios';

export default function CotacaoForm({ indicadores = [], onCadastro }) {
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [indicadorId, setIndicadorId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/cotacoes', {
      valor: parseFloat(valor),
      data,
      indicadorId: parseInt(indicadorId)
    }).then(() => {
      setValor('');
      setData('');
      setIndicadorId('');
      alert("Cotação cadastrada!");
      if (onCadastro) onCadastro();
    }).catch(err => {
      console.error("Erro:", err);
      alert("Erro ao cadastrar cotação.");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Cadastrar Cotação:</h2>
      <div>
        <label>Indicador:</label>
        <select value={indicadorId} onChange={e => setIndicadorId(e.target.value)} required>
          <option value="">Selecione</option>
          {Array.isArray(indicadores) && indicadores.map(ind => (
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
          onChange={e => setData(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Valor:</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}
