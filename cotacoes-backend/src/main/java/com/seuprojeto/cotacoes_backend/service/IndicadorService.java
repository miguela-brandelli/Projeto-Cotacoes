package com.seuprojeto.cotacoes_backend.service;

import com.seuprojeto.cotacoes_backend.model.Indicador;
import com.seuprojeto.cotacoes_backend.repository.IndicadorRepository;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IndicadorService {

    private final IndicadorRepository repository;

    public IndicadorService(IndicadorRepository repository) {
        this.repository = repository;
    }

    public List<Indicador> listarTodos() {
        return repository.findAll();
    }

    public Indicador salvar(Indicador indicador) {
        return repository.save(indicador);
    }

    public Optional<Indicador> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    @PostConstruct
    public void init() {
        Indicador dolar = new Indicador();
        dolar.setNome("Dólar");
        dolar.setSigla("USD");
        salvar(dolar); 
    }
}
