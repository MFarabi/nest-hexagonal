# ============ Stage 1: Build ============
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm (faster, more efficient than npm/yarn)
RUN npm install -g pnpm

# Copy dependency manifests
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (including dev)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the NestJS app (compiles TypeScript to JS)
RUN pnpm run build

# ============ Stage 2: Runtime ============
FROM node:20-alpine AS runtime

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy built app from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Optional: Copy .env if you use it (better via docker-compose or secrets)
# COPY .env .env

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Switch to non-root user
USER nestjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the app
CMD ["node", "dist/main.js"]