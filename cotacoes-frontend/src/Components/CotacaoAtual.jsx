// src/Components/CotacaoAtual.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const CotacaoAtual = () => {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('usd');
    const [cotacao, setCotacao] = useState(null);

    const opcoes = [
        { label: 'Dólar Americano (USD)', id: 'USD-BRL', api: 'moeda' },
        { label: 'Euro (EUR)', id: 'EUR-BRL', api: 'moeda' },
        { label: 'Bitcoin (BTC)', id: 'bitcoin', api: 'cripto' },
        { label: 'Ethereum (ETH)', id: 'ethereum', api: 'cripto' },
        { label: 'Ouro (GOLD)', id: 'gold', api: 'cripto' },
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
            } catch (error) {
                console.error('Erro ao buscar cotação:', error);
                setCotacao(null);
            }
        };

        buscarCotacao();
    }, [opcaoSelecionada]);

    return (
        <div className="cotacao-container">
            <label htmlFor="seletor-moeda">Escolha: </label>
            <select id="seletor-moeda" value={opcaoSelecionada} onChange={(e) => setOpcaoSelecionada(e.target.value)}>
                <option value="usd">Dólar</option>
                <option value="eur">Euro</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="gold">Ouro</option>
            </select>
            {cotacao !== null ? (
                <span><strong>R$ {cotacao}</strong></span>
            ) : (
                <span>Carregando...</span>
            )}
        </div>
    );
};

export default CotacaoAtual;
