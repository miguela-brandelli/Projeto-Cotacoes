package com.seuprojeto.cotacoes_backend.controller;

import com.seuprojeto.cotacoes_backend.dto.CotacaoDTO;
import com.seuprojeto.cotacoes_backend.model.Cotacao;
import com.seuprojeto.cotacoes_backend.model.CotacaoHistorico;
import com.seuprojeto.cotacoes_backend.model.Indicador;
import com.seuprojeto.cotacoes_backend.repository.CotacaoRepository;
import com.seuprojeto.cotacoes_backend.repository.IndicadorRepository;
import com.seuprojeto.cotacoes_backend.repository.CotacaoHistoricoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

    @Autowired
    private CotacaoHistoricoRepository cotacaoHistoricoRepository;

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

    @PutMapping("/{id}")
    public ResponseEntity<?> editarCotacao(@PathVariable Long id, @RequestBody CotacaoDTO dto) {
        Optional<Cotacao> opt = cotacaoRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cotacao cotacao = opt.get();

        CotacaoHistorico historico = new CotacaoHistorico();
        historico.setCotacao(cotacao);
        historico.setValorAntigo(BigDecimal.valueOf(cotacao.getValor()));
        historico.setDataAntiga(cotacao.getData());
        historico.setDataAlteracao(LocalDateTime.now());
        cotacaoHistoricoRepository.save(historico);
        
        cotacao.setValor(dto.getValor() != null ? dto.getValor().doubleValue() : null);
        cotacao.setData(dto.getData());

        cotacaoRepository.save(cotacao);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Cotacao> listarTodas() {
        return cotacaoRepository.findAll();
    }
}
