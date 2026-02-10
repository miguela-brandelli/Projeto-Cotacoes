# Dt.Value - Sistema de Cotações Financeiras

Dt.Value é uma aplicação web full-stack desenvolvida para o gerenciamento de cotações de indicadores financeiros (como Dólar, Bitcoin, Ouro, etc.). O sistema permite o cadastro de indicadores, o registro de suas cotações ao longo do tempo, edição com histórico de alterações e visualização gráfica da evolução dos valores.

## ✨ Funcionalidades

- ✅ Cadastro de indicadores financeiros
- ✅ Visualização das cotações dos principais indicadores em tempo real
- ✅ Registro de cotações com valor e data
- ✅ Edição de cotações com armazenamento de histórico
- ✅ Visualização de gráfico de evolução das cotações
- ✅ Exportação de cotações em PDF
- ✅ Exclusão de cotações
- ✅ Interface responsiva com CSS puro
- ✅ Persistência de dados com PostgreSQL

## 🚀 Como executar o projeto

### ⚡ Forma mais rápida (Docker Compose)

**Pré-requisitos:**
- Docker
- Docker Compose

**Execute na raiz do projeto:**

```bash
# Clone o repositório (se necessário)
git clone <url-do-repositorio>
cd dt-value

# Suba todos os serviços
docker-compose up --build

# Ou em modo background
docker-compose up --build -d
```

**Acessar:**
- Frontend: `http://localhost`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

**Parar os serviços:**
```bash
docker-compose down

# Para remover volumes (apaga dados do banco)
docker-compose down -v
```

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    Docker Compose                    │
├──────────────┬──────────────────┬───────────────────┤
│   Frontend   │     Backend      │    PostgreSQL     │
│  (React +    │  (Spring Boot)   │   (Database)      │
│   Nginx)     │                  │                   │
│   porta 80   │   porta 8080     │   porta 5432      │
└──────────────┴──────────────────┴───────────────────┘
       │               │                    │
       │               │                    │
       └───────────────┴────────────────────┘
              rede: cotacao-network
                        
              Volumes (persistência):
              - postgres_data
              - backend_logs
```

## 🛠️ Tecnologias utilizadas

### Front-end:
- **ReactJS** - Biblioteca JavaScript para UI
- **Vite** - Build tool rápida
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos interativos
- **jsPDF** - Exportação PDF
- **CSS puro** - Estilização sem frameworks
- **Nginx** - Servidor web

### Back-end:
- **Spring Boot 4.0** - Framework Java
- **Spring Data JPA** - Persistência de dados
- **Hibernate** - ORM
- **PostgreSQL 15** - Banco de dados relacional
- **Maven** - Gerenciador de dependências

### DevOps:
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Docker Volumes** - Persistência de dados
- **Multi-stage builds** - Otimização de imagens

## 📦 Estrutura do Projeto

```
dt-value/
├── cotacoes-backend/          # API REST Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/seuprojeto/cotacoes_backend/
│   │       │       ├── config/
│   │       │       │   └── CorsConfig.java
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── model/
│   │       │       └── repository/
│   │       └── resources/
│   │           ├── application.properties
│   │           └── application-prod.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── cotacoes-frontend/         # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml         # Orquestração de serviços
└── README.md                  # Este arquivo
```

## 🗄️ Persistência de Dados

O projeto utiliza **Docker Volumes** para garantir que os dados **não sejam perdidos** quando os containers são removidos:

### Volumes criados:
- **postgres_data**: Armazena todos os dados do PostgreSQL
- **backend_logs**: Armazena logs da aplicação Spring Boot

### Comandos úteis para volumes:

```bash
# Listar volumes
docker volume ls

# Inspecionar um volume
docker volume inspect dt-value_postgres_data

# Backup do banco de dados
docker run --rm \
  -v dt-value_postgres_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz /data

# Remover volumes não utilizados
docker volume prune
```

## 🔌 API Endpoints

### Indicadores

| Método | Endpoint                  | Descrição                   |
|--------|---------------------------|-----------------------------|
| GET    | /indicadores              | Lista todos os indicadores  |
| GET    | /indicadores/{id}         | Busca indicador por ID      |
| POST   | /indicadores              | Cria novo indicador         |
| PUT    | /indicadores/{id}         | Atualiza indicador          |
| DELETE | /indicadores/{id}         | Exclui indicador            |
| GET    | /indicadores/com-cotacoes | Indicadores com cotações    |

### Cotações

| Método | Endpoint       | Descrição                            |
|--------|----------------|--------------------------------------|
| POST   | /cotacoes      | Cadastra nova cotação                |
| PUT    | /cotacoes/{id} | Atualiza cotação + salva histórico   |
| DELETE | /cotacoes/{id} | Exclui cotação                       |

## 🔐 Configurações de Segurança

### CORS
CORS está configurado para permitir requisições de:
- `http://localhost`
- `http://localhost:80`
- `http://localhost:3000`

### Credenciais do Banco
⚠️ **IMPORTANTE**: Altere as credenciais padrão do PostgreSQL em produção!

Edite no `docker-compose.yml`:
```yaml
POSTGRES_USER: seu_usuario
POSTGRES_PASSWORD: sua_senha_forte
```

E no `application-prod.properties`:
```properties
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha_forte
```

## 🐛 Troubleshooting

### Backend não sobe
```bash
# Ver logs detalhados
docker logs cotacao-backend -f

# Reconstruir sem cache
docker-compose build --no-cache backend
docker-compose up backend
```

### Frontend com erro CORS
Verifique se a classe `CorsConfig.java` existe em:
```
cotacoes-backend/src/main/java/.../config/CorsConfig.java
```

### Banco de dados não conecta
```bash
# Verificar se o PostgreSQL está rodando
docker ps | grep postgres

# Testar conexão
docker exec -it cotacao-database psql -U cotacao_user -d cotacoes
```

### Portas já em uso
Se as portas 80, 8080 ou 5432 já estiverem em uso, edite `docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Muda porta externa
```

## 📚 Documentação Adicional

Para instruções detalhadas sobre cada componente:
- [README do Backend](./cotacoes-backend/README.md)
- [README do Frontend](./cotacoes-frontend/README.md)

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🎯 Roadmap

- [ ] Autenticação de usuários
- [ ] Dashboard com múltiplos gráficos
- [ ] Alertas de cotações
- [ ] API de cotações externas (integração)
- [ ] Testes automatizados
- [ ] CI/CD pipeline