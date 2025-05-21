package com.seuprojeto.cotacoes_backend.repository;

import com.seuprojeto.cotacoes_backend.model.Cotacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CotacaoRepository extends JpaRepository<Cotacao, Long> {
}