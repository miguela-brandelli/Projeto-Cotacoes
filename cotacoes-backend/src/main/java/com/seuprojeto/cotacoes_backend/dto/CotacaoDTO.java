package com.seuprojeto.cotacoes_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CotacaoDTO {
    private BigDecimal valor;
    private LocalDate data;
    private Long indicadorId;

    public CotacaoDTO() {}

    public CotacaoDTO(BigDecimal valor, LocalDate data, Long indicadorId) {
        this.valor = valor;
        this.data = data;
        this.indicadorId = indicadorId;
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
}
