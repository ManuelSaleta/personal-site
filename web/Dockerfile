# ==============================================================================
# Stage 1: Development (Hot-Reload Angular CLI Dev Server)
# ==============================================================================
FROM node:24-alpine AS dev
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200"]

# ==============================================================================
# Stage 2: Production Build
# ==============================================================================
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==============================================================================
# Stage 3: Production Runtime (Nginx)
# ==============================================================================
FROM nginx:1.27-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
