package com.seuprojeto.cotacoes_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de erro padrão")
public class ErrosResponseDTO {

    private String message;
    private int status;

    public ErrosResponseDTO() {
    }

    public ErrosResponseDTO(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}