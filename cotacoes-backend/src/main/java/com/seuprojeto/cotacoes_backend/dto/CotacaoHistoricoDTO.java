package com.seuprojeto.cotacoes_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class CotacaoHistoricoDTO {
    private BigDecimal valorAntigo;
    private LocalDate dataAntiga;
    private LocalDateTime dataAlteracao;

    public BigDecimal getValorAntigo() {
        return valorAntigo;
    }

    public void setValorAntigo(BigDecimal valorAntigo) {
        this.valorAntigo = valorAntigo;
    }

    public LocalDate getDataAntiga() {
        return dataAntiga;
    }

    public void setDataAntiga(LocalDate dataAntiga) {
        this.dataAntiga = dataAntiga;
    }

    public LocalDateTime getDataAlteracao() {
        return dataAlteracao;
    }

    public void setDataAlteracao(LocalDateTime dataAlteracao) {
        this.dataAlteracao = dataAlteracao;
    }
}
