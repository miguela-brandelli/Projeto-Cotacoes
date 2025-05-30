import React, { useState, useEffect } from 'react';
import './EditarCotacaoModal.css';
import axios from 'axios';


const EditarCotacaoModal = ({ cotacao, onClose, onSalvar }) => {
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');

    useEffect(() => {
        if (cotacao) {
            setData(cotacao.data);
            setValor(cotacao.valor);
        }
    }, [cotacao]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Enviando para API:", {
            id: cotacao.id,
            valor,
            data,
            indicadorId: cotacao.indicadorId
        });

        axios.put(`http://localhost:8080/cotacoes/${cotacao.id}`, {
            data,
            valor,
            indicadorId: cotacao.indicadorId
        })
            .then(() => {
                alert('Cotação atualizada com sucesso!');
                onSalvar();
                onClose();
            })
            .catch((err) => {
                console.error('Erro ao atualizar cotação:', err);
                alert('Erro ao atualizar cotação');
            });
    };

    if (!cotacao) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar Cotação</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Data:</label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Valor:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="botoes-modal">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        {/* <button type="button" disabled className="btn-grafico">Gráfico</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarCotacaoModal;
