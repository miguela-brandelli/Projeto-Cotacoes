import { useEffect, useState } from 'react';
import axios from 'axios';


const IndicadorTabela = ({ indicadores }) => {
  const handleEditar = (indicadorId, cotacao) => {
    console.log("Editar:", indicadorId, cotacao);
  };

  return (
    <div className="tabela-container">
      <h2>Indicadores e Cotações Cadastrados:</h2>
      <table className="tabela">
        <thead>
          <tr>
            <th>Indicador</th>
            <th>Sigla</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {indicadores.map((indicador, i) =>
            indicador.cotacoes.map((cotacao, j) => (
              <tr key={`${i}-${j}`}>
                <td>{indicador.nome}</td>
                <td>{indicador.sigla}</td>
                <td>{cotacao.data}</td>
                <td>R$ {cotacao.valor}</td>
                <td>
                  <button
                    onClick={() => handleEditar(indicador.id, cotacao)}
                    className="botao-editar"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IndicadorTabela;