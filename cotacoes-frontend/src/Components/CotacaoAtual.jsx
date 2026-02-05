// src/Components/CotacaoAtual.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const CotacaoAtual = ({ onMoedaChange }) => {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('usd');
    const [cotacao, setCotacao] = useState(null);

    const opcoes = [
        { label: 'Dólar Americano (USD)', id: 'USD-BRL', api: 'moeda' },
        { label: 'Dólar Canadense (CAD)', id: 'CAD-BRL', api: 'moeda' },
        { label: 'Dólar Australiano (AUD)', id: 'AUD-BRL', api: 'moeda' },
        { label: 'Euro (EUR)', id: 'EUR-BRL', api: 'moeda' },
        { label: 'Libra Esterlina (GBP)', id: 'GBP-BRL', api: 'moeda' },
        { label: 'Iene Japonês (JPY)', id: 'JPY-BRL', api: 'moeda' },
        { label: 'Yuan (CNY)', id: 'CNY-BRL', api: 'moeda' },
        { label: 'Rublo Russo (RUB)', id: 'RUB-BRL', api: 'moeda' },
        { label: 'Bitcoin (BTC)', id: 'bitcoin', api: 'cripto' },
        { label: 'Ethereum (ETH)', id: 'ethereum', api: 'cripto' },
        { label: 'Tether (USDT)', id: 'tether', api: 'cripto' },
    ];

    useEffect(() => {
        const buscarCotacao = async () => {
            try {
                const selecionado = opcoes.find(op => op.id.toLowerCase().includes(opcaoSelecionada));

                if (!selecionado) return;

                if (selecionado.api === 'moeda') {
                    const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${selecionado.id}`);
                    const key = selecionado.id.replace('-', '');
                    setCotacao(parseFloat(res.data[key].bid).toFixed(2));
                } else if (selecionado.api === 'cripto') {
                    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${selecionado.id}&vs_currencies=brl`);
                    setCotacao(parseFloat(res.data[selecionado.id].brl).toFixed(2));
                }
                if (onMoedaChange) {
                    onMoedaChange(opcaoSelecionada.toUpperCase());
                }
            } catch (error) {
                console.error('Erro ao buscar cotação:', error);
                setCotacao(null);
            }
        };

        buscarCotacao();
    }, [opcaoSelecionada, onMoedaChange]);

    return (
        <div className="cotacao-container">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '10px', color: '#5197d4' }}>
                    Indicadores em Tempo Real
                </h3>
                <select id="seletor-moeda" value={opcaoSelecionada} onChange={(e) => setOpcaoSelecionada(e.target.value)}>
                    <option value="usd">Dólar Americano</option>
                    <option value="cad">Dólar Canadense</option>
                    <option value="aud">Dólar Australiano</option>
                    <option value="eur">Euro</option>
                    <option value="gbp">Libra Esterlina</option>
                    <option value="jpy">Iene Japonês</option>
                    <option value="cny">Yuan Chinês</option>
                    <option value="rub">Rublo Russo</option>
                </select>
            </div>
            {cotacao !== null ? (
                <span><strong>R$ {cotacao}</strong></span>
            ) : (
                <span>Carregando...</span>
            )}
        </div>
    );
};

export default CotacaoAtual;
