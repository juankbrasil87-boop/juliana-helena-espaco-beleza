# --- STAGE 1: FRONTEND BUILDER ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json ./
# User's exact sequence
RUN npm install --ignore-scripts
RUN npm install @rollup/rollup-linux-x64-musl lightningcss --save-optional
# Copy the rest of the frontend
COPY frontend/ ./
RUN npm run build

# --- STAGE 2: RUNNER ---
FROM node:18-alpine
WORKDIR /app

# Final files serve from /app/frontend/dist (as configured in backend/src/server.ts)
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Backend setup
WORKDIR /app/backend
COPY backend/package.json ./
RUN npm install
COPY backend/ ./

# Expose the API port
EXPOSE 3001

# Run the server using tsx
CMD ["npx", "tsx", "src/server.ts"]
