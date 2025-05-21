import './App.css'
import IndicadorList from './Components/IndicadorList'
import IndicadorForm from './Components/IndicadorForm'
import CotacaoForm from './Components/CotacaoForm'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [indicadores, setIndicadores] = useState([]);

  const carregarIndicadores = () => {
    axios.get('http://localhost:8080/indicadores')
      .then(res => setIndicadores(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarIndicadores();
  }, []);

  return (
    <div className="App">
      <h1>Sistema de Cotações</h1>
      <IndicadorForm onCadastro={() => carregarIndicadores()} />
      <IndicadorList indicadores={indicadores} />
      <CotacaoForm />
    </div>
  )
}

export default App