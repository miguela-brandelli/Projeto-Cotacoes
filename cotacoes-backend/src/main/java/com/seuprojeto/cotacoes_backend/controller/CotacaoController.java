package com.seuprojeto.cotacoes_backend.controller;

import com.seuprojeto.cotacoes_backend.model.Cotacao;
import com.seuprojeto.cotacoes_backend.model.Indicador;
import com.seuprojeto.cotacoes_backend.repository.CotacaoRepository;
import com.seuprojeto.cotacoes_backend.repository.IndicadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cotacoes")
// @CrossOrigin(origins = "http://localhost:5173")
public class CotacaoController {

    @Autowired
    private CotacaoRepository cotacaoRepository;

    @Autowired
    private IndicadorRepository indicadorRepository;

    @GetMapping
    public List<Cotacao> listar() {
        return cotacaoRepository.findAll();
    }

    @PostMapping
    public Cotacao criar(@RequestBody Cotacao cotacao) {
        Long id = cotacao.getIndicador().getId();
        Indicador indicador = indicadorRepository.findById(id).orElseThrow();
        cotacao.setIndicador(indicador);
        return cotacaoRepository.save(cotacao);
    }
}
