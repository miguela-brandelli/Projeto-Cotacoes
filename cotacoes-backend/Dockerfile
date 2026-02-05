# Etapa 1: Build da aplicação
FROM maven:3.9-eclipse-temurin-17 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de configuração do Maven primeiro (cache de dependências)
COPY pom.xml .

# Baixa as dependências (fica em cache se pom.xml não mudar)
RUN mvn dependency:go-offline -B

# Copia o código fonte
COPY src ./src

# Compila a aplicação
RUN mvn clean package -DskipTests

# Etapa 2: Imagem final otimizada
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copia apenas o JAR compilado da etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]