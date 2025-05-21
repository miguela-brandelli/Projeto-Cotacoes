import { useEffect, useState } from 'react';
import axios from 'axios';

export default function IndicadorList() {
  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/indicadores')
      .then(response => setIndicadores(response.data))
      .catch(error => console.error("Erro ao buscar indicadores:", error));
  }, []);

  return (
    <div>
      <h2>Indicadores Financeiros</h2>
      <ul>
        {indicadores.map(ind => (
          <li key={ind.id}>
            {ind.nome} ({ind.sigla})
          </li>
        ))}
      </ul>
    </div>
  );
}
