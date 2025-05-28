package com.seuprojeto.cotacoes_backend.controller;

import com.seuprojeto.cotacoes_backend.dto.CotacaoDTO;
import com.seuprojeto.cotacoes_backend.model.Cotacao;
import com.seuprojeto.cotacoes_backend.model.Indicador;
import com.seuprojeto.cotacoes_backend.repository.CotacaoRepository;
import com.seuprojeto.cotacoes_backend.repository.IndicadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cotacoes")
@CrossOrigin(origins = "http://localhost:5173") // ajuste conforme sua porta
public class CotacaoController {

    @Autowired
    private CotacaoRepository cotacaoRepository;

    @Autowired
    private IndicadorRepository indicadorRepository;

    @PostMapping
    public ResponseEntity<?> salvarCotacao(@RequestBody CotacaoDTO dto) {
        Optional<Indicador> opt = indicadorRepository.findById(dto.getIndicadorId());
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body("Indicador não encontrado.");
        }

        Cotacao cotacao = new Cotacao();
        cotacao.setValor(dto.getValor() != null ? dto.getValor().doubleValue() : null); 
        cotacao.setData(dto.getData());
        cotacao.setIndicador(opt.get());

        cotacaoRepository.save(cotacao);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Cotacao> listarTodas() {
        return cotacaoRepository.findAll();
    }
}
