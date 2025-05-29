package com.seuprojeto.cotacoes_backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class CotacaoHistorico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Cotacao cotacao;

    private BigDecimal valorAntigo;
    private LocalDate dataAntiga;
    private LocalDateTime dataAlteracao;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public Cotacao getCotacao() {
        return cotacao;
    }

    public void setCotacao(Cotacao cotacao) {
        this.cotacao = cotacao;
    }

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