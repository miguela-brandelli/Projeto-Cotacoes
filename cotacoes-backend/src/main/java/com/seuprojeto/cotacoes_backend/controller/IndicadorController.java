package com.seuprojeto.cotacoes_backend.controller;

import com.seuprojeto.cotacoes_backend.dto.CotacaoDTO;
import com.seuprojeto.cotacoes_backend.dto.CotacaoHistoricoDTO;
import com.seuprojeto.cotacoes_backend.dto.IndicadorComCotacoesDTO;
import com.seuprojeto.cotacoes_backend.model.Indicador;
import com.seuprojeto.cotacoes_backend.repository.IndicadorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/indicadores")
public class IndicadorController {

    @Autowired
    private IndicadorRepository repository;

    @GetMapping
    public List<Indicador> getIndicadores() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Indicador> buscarPorId(@PathVariable Long id) {
        Optional<Indicador> indicador = repository.findById(id);
        return indicador.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Indicador criar(@RequestBody Indicador indicador) {
        return repository.save(indicador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Indicador> atualizar(@PathVariable Long id, @RequestBody Indicador dadosAtualizados) {
        return repository.findById(id)
                .map(indicador -> {
                    indicador.setNome(dadosAtualizados.getNome());
                    return ResponseEntity.ok(repository.save(indicador));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/com-cotacoes")
    public List<IndicadorComCotacoesDTO> listarComCotacoes() {
        List<Indicador> indicadores = repository.findAll();

        return indicadores.stream().map(indicador -> {
            IndicadorComCotacoesDTO dto = new IndicadorComCotacoesDTO();
            dto.setId(indicador.getId());
            dto.setNome(indicador.getNome());
            dto.setSigla(indicador.getSigla());

            List<CotacaoDTO> cotacoesDTO = indicador.getCotacoes().stream().map(c -> {
                CotacaoDTO cotDto = new CotacaoDTO();
                cotDto.setId(c.getId());
                cotDto.setData(c.getData());
                cotDto.setValor(java.math.BigDecimal.valueOf(c.getValor()));
                cotDto.setIndicadorId(indicador.getId());

                List<CotacaoHistoricoDTO> historicoDTOs = c.getHistoricos().stream().map(h -> {
                    CotacaoHistoricoDTO histDto = new CotacaoHistoricoDTO();
                    histDto.setDataAntiga(h.getDataAntiga());
                    histDto.setValorAntigo(h.getValorAntigo());
                    histDto.setDataAlteracao(h.getDataAlteracao());
                    return histDto;
                }).collect(Collectors.toList());

                cotDto.setHistorico(historicoDTOs);

                return cotDto;
            }).toList();

            dto.setCotacoes(cotacoesDTO);
            return dto;
        }).toList();
    }
}
