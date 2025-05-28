import './App.css';
// import IndicadorList from './Components/IndicadorList';
import IndicadorForm from './Components/IndicadorForm';
import CotacaoForm from './Components/CotacaoForm';
import IndicadoresTabela from './Components/IndicadoresTabela';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [indicadores, setIndicadores] = useState([]);
  const [indicadoresComCotacoes, setIndicadoresComCotacoes] = useState([]);

  const carregarIndicadores = () => {
    axios.get('http://localhost:8080/indicadores')
      .then(res => setIndicadores(res.data))
      .catch(err => console.error(err));
  };

  const carregarIndicadoresComCotacoes = () => {
    axios.get('http://localhost:8080/indicadores/com-cotacoes')
      .then(res => setIndicadoresComCotacoes(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarIndicadores();
    carregarIndicadoresComCotacoes();
  }, []);

  return (
    <div className="App">
      <h1 className="titulo-principal">Sistema de Cotações</h1>

      <div className="formulario-container">
        <IndicadorForm onCadastro={() => {
          carregarIndicadores();
          carregarIndicadoresComCotacoes();
        }} />
        <CotacaoForm />
      </div>

      <IndicadoresTabela indicadores={indicadoresComCotacoes} />
    </div>
  );
}

export default App;
