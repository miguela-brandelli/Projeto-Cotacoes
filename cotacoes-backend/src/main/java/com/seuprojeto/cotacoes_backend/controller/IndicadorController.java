package com.seuprojeto.cotacoes_backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seuprojeto.cotacoes_backend.dto.CotacaoDTO;
import com.seuprojeto.cotacoes_backend.dto.CotacaoHistoricoDTO;
import com.seuprojeto.cotacoes_backend.dto.ErrosResponseDTO;
import com.seuprojeto.cotacoes_backend.dto.IndicadorComCotacoesDTO;
import com.seuprojeto.cotacoes_backend.model.Indicador;
import com.seuprojeto.cotacoes_backend.repository.IndicadorRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/indicadores")
@Tag(name = "Indicadores", description = "Endpoints para gerenciamento  de inficadores financeiros")
public class IndicadorController {

    @Autowired
    private IndicadorRepository repository;

    @GetMapping
    @Operation(summary = "Buscar todos os indicadores")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Indicadores encontrados"),
        @ApiResponse(responseCode = "200", description = "Nenhum indicador encontrado")
    })
    public List<Indicador> getIndicadores() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar indicadores por ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Indicador encontrado"),
        @ApiResponse(responseCode = "200", description = "Indicador não encontrado")
    })
    public ResponseEntity<Indicador> buscarPorId(@PathVariable Long id) {
        Optional<Indicador> indicador = repository.findById(id);
        return indicador.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Criar um novo Indicador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Indicador criado com sucesso."),
        @ApiResponse(responseCode = "400", description = "Erro ao criar Indicador.")
    })
    public Indicador criar(@RequestBody Indicador indicador) {
        return repository.save(indicador);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar Indicador")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Indicador atualizado com sucesso."),
        @ApiResponse(responseCode = "400", description = "Erro ao atualizar o Indicador.")
    })
    public ResponseEntity<Indicador> atualizar(@PathVariable Long id, @RequestBody Indicador dadosAtualizados) {
        return repository.findById(id)
                .map(indicador -> {
                    indicador.setNome(dadosAtualizados.getNome());
                    return ResponseEntity.ok(repository.save(indicador));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar Indicador")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Indicador deletado com sucesso."),
        @ApiResponse(responseCode = "400", description = "Erro ao deletar o Indicador.")
    })
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/com-cotacoes")
    @Operation(summary = "Listar indicadores com suas cotações")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Indicadores listados com sucesso."),
        @ApiResponse(
                responseCode = "400",
                description = "Erro ao listar os indicadores.",
                content = @Content(
                        mediaType = "application/json",
                        schema = @Schema(implementation = ErrosResponseDTO.class)
                )
        )
    }
    )

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
