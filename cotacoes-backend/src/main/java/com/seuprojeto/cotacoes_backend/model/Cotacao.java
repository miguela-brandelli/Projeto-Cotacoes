package com.seuprojeto.cotacoes_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Cotacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double valor;

    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "indicador_id")
    private Indicador indicador;

    // Getters e Setters
}