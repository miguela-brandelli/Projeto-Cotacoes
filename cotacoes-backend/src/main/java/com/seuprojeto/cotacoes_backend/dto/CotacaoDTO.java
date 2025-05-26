package com.seuprojeto.cotacoes_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CotacaoDTO {
    private LocalDate data;
    private BigDecimal valor;

    public CotacaoDTO() {}

    public CotacaoDTO(LocalDate data, BigDecimal valor) {
        this.data = data;
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
}
