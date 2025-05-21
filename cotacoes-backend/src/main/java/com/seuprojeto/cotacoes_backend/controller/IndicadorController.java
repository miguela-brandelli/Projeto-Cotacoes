package com.seuprojeto.cotacoes_backend.controller;

import com.seuprojeto.cotacoes_backend.model.Indicador;
import com.seuprojeto.cotacoes_backend.repository.IndicadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/indicadores")
// @CrossOrigin(origins = "http://localhost:5173")
public class IndicadorController {

    @Autowired
    private IndicadorRepository repository;

    // GET - Listar todos os indicadores
    @GetMapping
    public List<Indicador> listarTodos() {
        return repository.findAll();
    }

    // GET - Buscar um indicador por ID
    @GetMapping("/{id}")
    public ResponseEntity<Indicador> buscarPorId(@PathVariable Long id) {
        Optional<Indicador> indicador = repository.findById(id);
        return indicador.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    // POST - Criar um novo indicador
    @PostMapping
    public Indicador criar(@RequestBody Indicador indicador) {
        return repository.save(indicador);
    }

    // PUT - Atualizar um indicador existente
    @PutMapping("/{id}")
    public ResponseEntity<Indicador> atualizar(@PathVariable Long id, @RequestBody Indicador dadosAtualizados) {
        return repository.findById(id)
                .map(indicador -> {
                    indicador.setNome(dadosAtualizados.getNome());
                    return ResponseEntity.ok(repository.save(indicador));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Remover um indicador
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
