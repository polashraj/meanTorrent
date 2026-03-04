# Stage 1: Build Frontend
FROM node:alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend /app/frontend/dist ./frontend
# RUN npm run build-backend (if needed)

# Final Stage: Production Image
FROM node:alpine AS production
WORKDIR /app
COPY --from=backend /app/backend ./
EXPOSE 3000
CMD ["node", "server.js"]