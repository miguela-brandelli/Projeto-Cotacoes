# Dt.Value - Frontend

Interface web para o sistema de cotações de indicadores financeiros.

## 🖼️ Visão Geral

Aplicação construída em **ReactJS** com **Vite**, servida por **Nginx**. Permite:

- Cadastrar indicadores financeiros
- Cadastrar cotações para os indicadores
- Visualizar e editar cotações
- Visualizar gráficos de evolução com Recharts
- Visualizar cotações em tempo real
- Exportar cotações em PDF
- Excluir cotações

## 🚀 Como rodar o frontend

### ✅ Opção 1: Com Docker (Recomendado)

O projeto está configurado para rodar com **Docker Compose** junto com Backend e PostgreSQL.

**Na raiz do projeto** (pasta que contém `docker-compose.yml`):

```bash
# Sobe todos os serviços (backend, frontend e database)
docker-compose up --build

# Ou em modo detached (background)
docker-compose up --build -d

# Ver logs do frontend
docker logs cotacao-frontend -f

# Parar tudo
docker-compose down
```

O frontend estará disponível em: `http://localhost`

### 📋 Opção 2: Desenvolvimento local

**Pré-requisitos:**
- Node.js 18+
- npm

**Executar:**

```bash
cd cotacoes-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: `http://localhost:5173`

⚠️ **Importante:** Certifique-se de que o backend esteja rodando em `http://localhost:8080`

## 🛠️ Tecnologias

- **ReactJS** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **Axios** - Cliente HTTP para requisições
- **Recharts** - Biblioteca para gráficos
- **jsPDF** - Geração de PDF no cliente
- **Nginx** - Servidor web para produção
- **CSS puro** - Estilização sem frameworks

## 📦 Estrutura do Projeto

```
cotacoes-frontend/
├── src/
│   ├── components/
│   │   ├── IndicadorForm.jsx
│   │   ├── CotacaoForm.jsx
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
├── nginx.conf
├── package.json
└── vite.config.js
```

## 🐳 Docker

O frontend usa **multi-stage build**:

1. **Stage 1**: Compila a aplicação React com Vite
2. **Stage 2**: Serve os arquivos estáticos com Nginx

### Configuração do Nginx

A aplicação usa uma configuração customizada do Nginx (`nginx.conf`) que:
- Serve arquivos estáticos da pasta `/usr/share/nginx/html`
- Configura fallback para SPA (Single Page Application)
- Otimiza cache de assets

## 🔌 Integração com Backend

O frontend se comunica com o backend através do Axios:

```javascript
// Produção (Docker)
http://backend:8080

// Desenvolvimento local
http://localhost:8080
```

**Endpoints consumidos:**
- `GET /indicadores` - Lista indicadores
- `POST /indicadores` - Cadastra indicador
- `GET /indicadores/com-cotacoes` - Indicadores com cotações
- `POST /cotacoes` - Cadastra cotação
- `PUT /cotacoes/{id}` - Atualiza cotação
- `DELETE /cotacoes/{id}` - Deleta cotação

## 📊 Funcionalidades de UI

### Feedback Visual
- ✅ Mensagens de sucesso em verde
- ❌ Mensagens de erro em vermelho
- ⏳ Indicador de carregamento durante requisições
- 🔒 Desabilita campos durante envio

### Gráficos
- Gráficos de linha para evolução temporal
- Tooltip interativo ao passar o mouse
- Responsivo e adaptável

### Exportação PDF
- Exporta cotações de um indicador específico
- Formatação automática de data e valores

## 🎨 Estilização

O projeto usa **CSS puro** sem frameworks, com:
- Variáveis CSS para temas
- Flexbox para layouts responsivos
- Grid CSS para organização de cards
- Animações e transições suaves

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## 📱 Responsividade

A interface é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)