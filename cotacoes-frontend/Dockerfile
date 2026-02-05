# Etapa 1: Build da aplicação React com Vite
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos de dependências primeiro (cache)
COPY package*.json ./

# Instala as dependências
RUN npm ci --silent

# Copia o código fonte
COPY . .

# Cria o build de produção com Vite
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos buildados do Vite para o Nginx (dist, não build)
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]