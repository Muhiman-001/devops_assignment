FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with clean npm cache
RUN npm cache clean --force && \
    npm install

# Copy source code
COPY . .

# Create build directory
RUN mkdir -p build

# Build the application with explicit environment
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 