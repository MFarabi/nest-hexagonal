# --------------------- STAGE 1: BUILD (order app only) ---------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install ONLY production dependencies (shared across apps)
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps/order apps/order
COPY libs libs  # if you have shared libs

# Install deps (uses package-lock.json)
RUN npm ci

# Build ONLY the 'order' app
RUN npm run build order

# --------------------- STAGE 2: RUNTIME (tiny image) ---------------------
FROM node:20-alpine AS runtime

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs appuser

# Copy only the built app + minimal node_modules
COPY --from=builder --chown=appuser:nodejs /app/dist/apps/order ./dist
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/package.json ./

# Optional: copy shared config if needed
# COPY --from=builder /app/apps/order/.env ./.env

USER appuser

EXPOSE 23300

# Entry point: the compiled main.js of the 'order' app
CMD ["node", "dist/main.js"]