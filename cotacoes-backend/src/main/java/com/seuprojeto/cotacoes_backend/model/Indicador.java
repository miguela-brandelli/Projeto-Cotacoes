package com.seuprojeto.cotacoes_backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Indicador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String sigla;

    @OneToMany(mappedBy = "indicador", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cotacao> cotacoes = new ArrayList<>();

    // Getters e Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public String getSigla() { return sigla; }

    public void setSigla(String sigla) { this.sigla = sigla; }

    public List<Cotacao> getCotacoes() { return cotacoes; }

    public void setCotacoes(List<Cotacao> cotacoes) { this.cotacoes = cotacoes; }
}
