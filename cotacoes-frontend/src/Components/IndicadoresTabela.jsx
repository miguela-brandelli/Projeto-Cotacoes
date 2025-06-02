import { useState } from 'react';
import EditarCotacaoModal from './EditarCotacaoModal.jsx';
import GraficoCotacaoModal from './GraficoCotacaoModal.jsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const excluirCotacao = (cotacaoId) => {
  if (window.confirm("Tem certeza que deseja excluir esta cotação?")) {
    axios.delete(`http://localhost:8080/cotacoes/${cotacaoId}`)
      .then(() => {
        alert("Cotação excluída!");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Erro ao excluir cotação:", err);
        alert("Erro ao excluir cotação");
      });
  }
};

const exportarCotacaoParaPDF = (indicador, cotacao) => {
  const doc = new jsPDF();

  doc.text(`Cotação de ${indicador.nome} (${indicador.sigla})`, 10, 10);

  autoTable(doc, {
    startY: 20,
    head: [['Data', 'Valor']],
    body: [[
      new Date(cotacao.data).toLocaleDateString('pt-BR'),
      `R$ ${cotacao.valor}`
    ]]
  });

  doc.save(`cotacao-${indicador.sigla}.pdf`);
};

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
                  <button
                    onClick={() => exportarCotacaoParaPDF(indicador, cotacao)}
                    className="botao-editar"
                  >
                    Exportar
                  </button>
                  <button
                    onClick={() => excluirCotacao(cotacao.id)}
                    className="botao-editar"
                    style={{ backgroundColor: '#f44336' }}
                  >
                    Excluir
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
