# MonValue - Backend

API REST desenvolvida em **Spring Boot** para gerenciamento de indicadores financeiros e suas cotações.

## 🔍 Visão Geral

Este backend oferece os seguintes recursos:

- Cadastro de indicadores
- Cadastro de cotações vinculadas a indicadores
- Edição de cotações com histórico automático
- Exclusão de cotações
- Listagem de indicadores com suas cotações
- Retorno de dados prontos para o frontend gerar gráficos

## 📦 Estrutura do Projeto

cotacoes-backend/
├── src/
│ ├── main/
│ │ ├── java/
│ │ │ └── com/seuprojeto/cotacoes_backend/
│ │ │ ├── config/
│ │ │ ├── controller/
│ │ │ ├── dto/
│ │ │ ├── model/
│ │ │ └── repository/
│ │ └── resources/
│ │ ├── application.properties
│ │ └── ...
├── pom.xml

## ⚙️ Como executar o projeto

### Pré-requisitos

- Java 17+ (ou compatível)
- Maven
- Banco H2 (configurado automaticamente)

### Passos para rodar:

1. Acesse a pasta do backend:
   ```bash
   cd cotacoes-backend

2. Compile o projeto com Maven:
    ./mvnw clean install

3. Rode a aplicação:
    ./mvnw spring-boot:run

## 🛠️ Tecnologias

-Java 17
-Spring Boot
-Spring Web
-Spring Data JPA
-H2 Database (dev)
-Maven

## 🔐 CORS

CORS está configurado para permitir chamadas do frontend em http://localhost:5173.

## 📂 API Endpoints

-Indicadores:

| Método | Rota                      | Descrição                  |
| ------ | ------------------------- | -------------------------- |
| GET    | /indicadores              | Lista todos os indicadores |
| GET    | /indicadores/{id}         | Buscar indicador por ID    |
| POST   | /indicadores              | Criar um novo indicador    |
| PUT    | /indicadores/{id}         | Atualizar um indicador     |
| DELETE | /indicadores/{id}         | Excluir um indicador       |
| GET    | /indicadores/com-cotacoes | Indicadores + cotações     |

-Cotações:

| Método | Rota           | Descrição                            |
| ------ | -------------- | ------------------------------------ |
| POST   | /cotacoes      | Cadastrar nova cotação               |
| PUT    | /cotacoes/{id} | Atualizar cotação + salvar histórico |
| DELETE | /cotacoes/{id} | Excluir cotação                      |
