import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CotacaoForm() {
  const [indicadores, setIndicadores] = useState([]);
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [indicadorId, setIndicadorId] = useState('');

  // useEffect(() => {
  //   axios.get('http://localhost:8080/indicadores')
  //     .then(res => setIndicadores(res.data));
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/indicadores')
      .then(res => {
        console.log("Resposta da API:", res.data);
        setIndicadores(res.data);
      })
      .catch(err => {
        console.error("Erro ao buscar indicadores:", err);
      });
  }, []);

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
    }).catch(err => console.error("Erro:", err));
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