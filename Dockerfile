# --------------------- STAGE 1: BUILD (order app only) ---------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (cache npm install)
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Copy the order app
COPY apps/order apps/order

# Copy shared libs ONLY if the directory exists
COPY libs* libs/ 2>/dev/null || true

# Install dependencies
RUN npm ci

# Build only the 'order' app
RUN npm run build order

# --------------------- STAGE 2: RUNTIME ---------------------
FROM node:20-alpine AS runtime

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs appuser

# Copy built app + node_modules
COPY --from=builder --chown=appuser:nodejs /app/dist/apps/order ./dist
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/package.json ./

USER appuser

EXPOSE 23300

CMD ["node", "dist/main.js"]