package com.seuprojeto.cotacoes_backend.repository;

import com.seuprojeto.cotacoes_backend.model.Indicador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndicadorRepository extends JpaRepository<Indicador, Long> {
}
