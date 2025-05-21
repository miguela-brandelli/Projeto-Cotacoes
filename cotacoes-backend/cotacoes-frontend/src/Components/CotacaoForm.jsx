import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CotacaoForm() {
  const [indicadores, setIndicadores] = useState([]);
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [indicadorId, setIndicadorId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/indicadores')
      .then(res => setIndicadores(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/cotacoes', {
      valor,
      data,
      indicador: { id: indicadorId }
    }).then(() => {
      setValor('');
      setData('');
      setIndicadorId('');
      alert("Cotação cadastrada!");
    }).catch(err => console.error("Erro:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Cotação</h2>
      <div>
        <label>Indicador:</label>
        <select value={indicadorId} onChange={e => setIndicadorId(e.target.value)} required>
          <option value="">Selecione</option>
          {indicadores.map(ind => (
            <option key={ind.id} value={ind.id}>
              {ind.nome} ({ind.sigla})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Data:</label>
        <input type="date" value={data} onChange={e => setData(e.target.value)} required />
      </div>
      <div>
        <label>Valor:</label>
        <input type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}