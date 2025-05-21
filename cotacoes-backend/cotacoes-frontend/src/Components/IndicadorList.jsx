
export default function IndicadorList({ indicadores }) {
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

