import './App.css';
import IndicadorForm from './Components/IndicadorForm';
import CotacaoForm from './Components/CotacaoForm';
import IndicadoresTabela from './Components/IndicadoresTabela';
import CotacaoAtual from './Components/CotacaoAtual';
import GraficoHistoricoTempoReal from './Components/GraficoHistoricoTempoReal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from 'recharts';

function App() {
  const [indicadores, setIndicadores] = useState([]);
  const [indicadoresComCotacoes, setIndicadoresComCotacoes] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState('USD');

  const carregarIndicadores = () => {
    axios.get('http://localhost:8080/indicadores')
      .then(res => setIndicadores(res.data))
      .catch(err => console.error(err));
  };

  const carregarIndicadoresComCotacoes = () => {
    axios.get('http://localhost:8080/indicadores/com-cotacoes')
      .then(res => {
        console.log("Indicadores atualizados com cotações:", res.data);
        setIndicadoresComCotacoes(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarIndicadores();
    carregarIndicadoresComCotacoes();
  }, []);

  return (
    <div className="App">
      <img className="logo" src="/android-chrome-192x192.png" alt="Logo" />
      <h1 className="titulo-principal">MonValue</h1>
      <h4 className="subtitulo-principal">O valor da informação certa, na hora certa.</h4>

      <div className="cotacoes-bloco-central">
        <CotacaoAtual onMoedaChange={setMoedaSelecionada} />
        <div className="grafico-box">
          <GraficoHistoricoTempoReal moeda={moedaSelecionada} />
        </div>
      </div>

      <hr className="divisor" />
      <h2 className="titulo-secundario">Minhas Cotações e Indicadores</h2>
      <div className="formulario-container">
        <IndicadorForm onCadastro={() => {
          carregarIndicadores();
          carregarIndicadoresComCotacoes();
        }} />

        <CotacaoForm
          indicadores={indicadores}
          onCadastro={carregarIndicadoresComCotacoes}
        />
      </div>

      <IndicadoresTabela indicadores={indicadoresComCotacoes} />
    </div>
  );
}

export default App;
