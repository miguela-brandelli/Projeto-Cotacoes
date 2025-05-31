import { useState } from 'react';
import EditarCotacaoModal from './EditarCotacaoModal';
import GraficoCotacaoModal from './GraficoCotacaoModal.jsx';

const formatarData = (isoDate) => {
  return new Date(isoDate).toLocaleDateString('pt-BR');
};

const IndicadoresTabela = ({ indicadores }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [cotacaoSelecionada, setCotacaoSelecionada] = useState(null);
  const [mostrarGrafico, setMostrarGrafico] = useState(false);
  const [cotacoesParaGrafico, setCotacoesParaGrafico] = useState([]);
  const [nomeIndicador, setNomeIndicador] = useState('');

  const handleEditar = (indicadorId, cotacao) => {
    const cotacaoComId = {
      id: cotacao.id,
      data: cotacao.data,
      valor: cotacao.valor,
      indicadorId: indicadorId
    };
    setCotacaoSelecionada(cotacaoComId);
    setModalAberto(true);
  };

  const handleAbrirGrafico = (indicador) => {
    setCotacoesParaGrafico(indicador.cotacoes);
    setNomeIndicador(indicador.nome);
    setMostrarGrafico(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCotacaoSelecionada(null);
  };

  const recarregarPagina = () => {
    window.location.reload();
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
                <td>{formatarData(cotacao.data)}</td>
                <td>R$ {cotacao.valor}</td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleEditar(indicador.id, cotacao)}
                    className="botao-editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleAbrirGrafico(indicador)}
                    className="botao-editar"
                  >
                    Gráfico
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalAberto && (
        <EditarCotacaoModal
          cotacao={cotacaoSelecionada}
          onClose={fecharModal}
          onSalvar={recarregarPagina}
        />
      )}

      {mostrarGrafico && (
        <GraficoCotacaoModal
          cotacoes={cotacoesParaGrafico}
          indicadorNome={nomeIndicador}
          onClose={() => setMostrarGrafico(false)}
        />
      )}
    </div>
  );
};

export default IndicadoresTabela;
