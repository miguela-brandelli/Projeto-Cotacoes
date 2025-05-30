package com.seuprojeto.cotacoes_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class CotacaoDTO {
    private Long id; 
    private BigDecimal valor;
    private LocalDate data;
    private Long indicadorId;

    // NOVO: Lista de históricos
    private List<CotacaoHistoricoDTO> historico;

    public CotacaoDTO() {}

    public CotacaoDTO(Long id, BigDecimal valor, LocalDate data, Long indicadorId) {
        this.id = id;
        this.valor = valor;
        this.data = data;
        this.indicadorId = indicadorId;
    }

    // GETTERS & SETTERS
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Long getIndicadorId() {
        return indicadorId;
    }

    public void setIndicadorId(Long indicadorId) {
        this.indicadorId = indicadorId;
    }

    // NOVOS GETTERS & SETTERS para histórico
    public List<CotacaoHistoricoDTO> getHistorico() {
        return historico;
    }

    public void setHistorico(List<CotacaoHistoricoDTO> historico) {
        this.historico = historico;
    }
}
