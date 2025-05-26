package com.seuprojeto.cotacoes_backend.dto;

import java.util.List;

public class IndicadorComCotacoesDTO {
    private Long id;
    private String nome;
    private String sigla;
    private List<CotacaoDTO> cotacoes;

    public IndicadorComCotacoesDTO() {}

    public IndicadorComCotacoesDTO(Long id, String nome, String sigla, List<CotacaoDTO> cotacoes) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
        this.cotacoes = cotacoes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public List<CotacaoDTO> getCotacoes() {
        return cotacoes;
    }

    public void setCotacoes(List<CotacaoDTO> cotacoes) {
        this.cotacoes = cotacoes;
    }
}
