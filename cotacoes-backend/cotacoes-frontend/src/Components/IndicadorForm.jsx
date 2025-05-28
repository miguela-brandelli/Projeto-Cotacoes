import { useState } from 'react';
import axios from 'axios';

export default function IndicadorForm({ onCadastro }) {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/indicadores', {
        nome,
        sigla
      });

      setNome('');
      setSigla('');
      if (onCadastro) onCadastro(response.data); // Atualiza a lista se for passado por props
    } catch (error) {
      console.error("Erro ao cadastrar indicador:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Cadastrar Indicador:</h2>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Sigla:</label>
        <input type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}