# Etapa 1: Build
FROM node:18-slim AS builder

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Runner con Flyway
FROM node:18-slim AS runner

WORKDIR /app

# Instalar Flyway
RUN apt-get update && apt-get install -y curl bash openjdk-17-jre && \
    curl -L https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/9.22.0/flyway-commandline-9.22.0-linux-x64.tar.gz | tar xz && \
    mv flyway-9.22.0 /flyway && ln -s /flyway/flyway /usr/local/bin/flyway

# Cloud SQL PostgreSQL socket factory
RUN curl -o /flyway/lib/cloud-sql-connector.jar \
    https://repo1.maven.org/maven2/com/google/cloud/sql/postgres-socket-factory/1.11.1/postgres-socket-factory-1.11.1.jar

# Copiar app y migraciones
COPY --from=builder /app /app
COPY .env .env

# Exponer puerto
ENV PORT 8080
EXPOSE 8080

# Ejecutar migraciones y luego app
CMD sh -c "export $(cat .env | xargs) && flyway -configFiles=/app/migrations/flyway.conf migrate && npm run start"