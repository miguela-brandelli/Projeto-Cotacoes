# Dt.Value - Backend

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

```
cotacoes-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/seuprojeto/cotacoes_backend/
│   │   │       ├── config/
│   │   │       │   └── CorsConfig.java
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── model/
│   │   │       └── repository/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-prod.properties
├── Dockerfile
└── pom.xml
```

## ⚙️ Como executar o projeto

### ✅ Opção 1: Com Docker (Recomendado)

O projeto está configurado para rodar com **Docker Compose** junto com PostgreSQL e Frontend.

**Na raiz do projeto** (pasta que contém `docker-compose.yml`):

```bash
# Sobe todos os serviços (backend, frontend e database)
docker-compose up --build

# Ou em modo detached (background)
docker-compose up --build -d

# Ver logs do backend
docker logs cotacao-backend -f

# Parar tudo
docker-compose down
```

O backend estará disponível em: `http://localhost:8080`

### 📋 Opção 2: Sem Docker (Desenvolvimento local)

**Pré-requisitos:**
- Java 17+
- Maven
- PostgreSQL rodando localmente na porta 5432

**Configuração do banco local:**
```sql
CREATE DATABASE cotacoes;
CREATE USER cotacao_user WITH PASSWORD 'senha_segura_aqui';
GRANT ALL PRIVILEGES ON DATABASE cotacoes TO cotacao_user;
```

**Executar:**
```bash
cd cotacoes-backend

# Compile o projeto
./mvnw clean install

# Rode a aplicação
./mvnw spring-boot:run
```

## 🛠️ Tecnologias

- Java 17
- Spring Boot 4.0
- Spring Web
- Spring Data JPA
- PostgreSQL 15
- Hibernate
- Maven

## 🗄️ Persistência de Dados

O projeto utiliza **PostgreSQL** com **Docker Volumes** para persistência:

- Volume `postgres_data`: Armazena dados do banco de dados
- Volume `backend_logs`: Armazena logs da aplicação em `/app/logs`

Os dados **persistem** mesmo após remover os containers.

## 🔐 CORS

CORS está configurado na classe `CorsConfig.java` para permitir chamadas de:
- `http://localhost`
- `http://localhost:80`
- `http://localhost:3000`

## 📂 API Endpoints

### Indicadores:

| Método | Rota                      | Descrição                  |
| ------ | ------------------------- | -------------------------- |
| GET    | /indicadores              | Lista todos os indicadores |
| GET    | /indicadores/{id}         | Buscar indicador por ID    |
| POST   | /indicadores              | Criar um novo indicador    |
| PUT    | /indicadores/{id}         | Atualizar um indicador     |
| DELETE | /indicadores/{id}         | Excluir um indicador       |
| GET    | /indicadores/com-cotacoes | Indicadores + cotações     |

### Cotações:

| Método | Rota           | Descrição                            |
| ------ | -------------- | ------------------------------------ |
| POST   | /cotacoes      | Cadastrar nova cotação               |
| PUT    | /cotacoes/{id} | Atualizar cotação + salvar histórico |
| DELETE | /cotacoes/{id} | Excluir cotação                      |

## 🐳 Docker

O backend usa **multi-stage build** para otimização:

1. **Stage 1**: Compila o projeto com Maven
2. **Stage 2**: Imagem final leve apenas com JRE e JAR compilado

**Variáveis de ambiente disponíveis:**
- `SPRING_PROFILES_ACTIVE`: Define o profile (dev/prod)
- `SPRING_DATASOURCE_URL`: URL do PostgreSQL
- `SPRING_DATASOURCE_USERNAME`: Usuário do banco
- `SPRING_DATASOURCE_PASSWORD`: Senha do banco

## 📝 Logs

Logs são salvos em `/app/logs/application.log` dentro do container e persistidos no volume `backend_logs`.

**Ver logs:**
```bash
# Logs em tempo real
docker logs cotacao-backend -f

# Ou acessar o volume diretamente
docker exec -it cotacao-backend cat /app/logs/application.log
```