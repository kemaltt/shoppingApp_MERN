# Use Node.js Alpine Linux image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (production only)
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Copy source code
COPY . .

# Create uploads directory and set permissions
RUN mkdir -p images/undefined/product/upload-images images/undefined/profile/upload-images
RUN chown -R nodeuser:nodejs images/ || true

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Health check using the existing /health endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]