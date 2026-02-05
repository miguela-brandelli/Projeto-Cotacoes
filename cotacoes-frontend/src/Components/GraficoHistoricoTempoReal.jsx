import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const GraficoHistoricoTempoReal = ({ moeda }) => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!moeda) return;

    const fetchDados = async () => {
      setCarregando(true);
      setErro(null);
      try {
        let url = '';

        if (["USD", "CAD", "AUD", "EUR", "GBP", "JPY", "CNY", "RUB"].includes(moeda)) {
          url = `https://economia.awesomeapi.com.br/json/daily/${moeda}-BRL/15`;
          const res = await fetch(url);
          const json = await res.json();
          const convertidos = json.reverse().map((item) => ({
            data: new Date(item.timestamp * 1000).toLocaleDateString('pt-BR'),
            valor: parseFloat(item.bid)
          }));
          setDados(convertidos);
        } else {

          const mapeamento = {
            BTC: 'bitcoin',
            ETH: 'ethereum',
            USDT: 'tether'
          };

          const hoje = Math.floor(Date.now() / 1000);
          const seteDiasAtras = hoje - 60 * 60 * 24 * 15;

          const res = await fetch(`https://api.coingecko.com/api/v3/coins/${mapeamento[moeda]}/market_chart?vs_currency=brl&days=15`);
          const json = await res.json();

          const convertidos = json.prices.map(([timestamp, price]) => ({
            data: new Date(timestamp).toLocaleDateString('pt-BR'),
            valor: parseFloat(price.toFixed(2))
          }));
          setDados(convertidos);
        }
      } catch (e) {
        setErro("Erro ao carregar gráfico.");
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, [moeda]);

  if (!moeda) return null;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {carregando ? (
        <p style={{ textAlign: 'center' }}>Carregando gráfico...</p>
      ) : erro ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{erro}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Line type="monotone" dataKey="valor" stroke=" #1571c1" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GraficoHistoricoTempoReal;
