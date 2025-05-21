import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IndicadorList from './IndicadorList'

function App() {
  return (
    <div className="App">
      <h1>Sistema de Cotações</h1>
      <IndicadorList />
    </div>
  )
}

export default App