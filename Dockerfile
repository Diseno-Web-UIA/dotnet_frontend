# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servidor estático con Nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Optional: redirección para apps SPA (React Router)
RUN echo 'server {\n\
  listen 80;\n\
  server_name localhost;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri /index.html;\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8084

CMD ["nginx", "-g", "daemon off;"]