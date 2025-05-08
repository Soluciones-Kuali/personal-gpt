# Etapa 1: Construcción de la aplicación
FROM node:18-slim AS builder

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Contenedor final con Flyway y la aplicación
FROM node:18-slim AS runner

WORKDIR /app

# Instalar Flyway y herramientas necesarias
RUN apt-get update && apt-get install -y curl bash && \
    curl -L https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/9.22.0/flyway-commandline-9.22.0-linux-x64.tar.gz | tar xz && \
    mv flyway-9.22.0 /flyway && \
    ln -s /flyway/flyway /usr/local/bin/flyway

# Descargar el conector de Google Cloud SQL para PostgreSQL
RUN curl -o /flyway/lib/cloud-sql-connector.jar \
    https://repo1.maven.org/maven2/com/google/cloud/sql/postgres-socket-factory/1.11.1/postgres-socket-factory-1.11.1.jar

# Copiar la aplicación desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/migrations /migrations

COPY .env .env

# Asegurar permisos correctos para flyway.conf
RUN chmod 755 /migrations/flyway.conf

# Exponer el puerto 8080
ENV PORT 8080
EXPOSE 8080

# Ejecutar Flyway y luego iniciar la aplicación
CMD sh -c "export $(cat .env | xargs) && npm run start"