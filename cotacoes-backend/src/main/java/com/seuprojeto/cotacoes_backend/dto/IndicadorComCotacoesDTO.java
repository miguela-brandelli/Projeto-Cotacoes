package com.seuprojeto.cotacoes_backend.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Indicador com suas respectivas cotações")
public class IndicadorComCotacoesDTO {

    @Schema(description = "ID do indicador", example = "1")
    private Long id;

    @Schema(description = "Nome do indicador", example = "Dólar")
    private String nome;

    @Schema(description = "Sigla do indicador", example = "USD")
    private String sigla;

    @Schema(description = "Lista de cotações vinculadas ao indicador")
    private List<CotacaoDTO> cotacoes;

    public IndicadorComCotacoesDTO() {
    }

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
