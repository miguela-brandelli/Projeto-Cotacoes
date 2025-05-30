package com.seuprojeto.cotacoes_backend.repository;

import com.seuprojeto.cotacoes_backend.model.CotacaoHistorico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CotacaoHistoricoRepository extends JpaRepository<CotacaoHistorico, Long> {
}
