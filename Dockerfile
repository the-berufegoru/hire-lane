# Stage 1: Build the application
FROM node:21-alpine3.18 AS builder

WORKDIR /hire-lane

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the application
RUN npx nx build

# Stage 2: Create the runtime image
FROM node:21-alpine3.18

# Set environment variables
ENV NODE_ENV=develpment

WORKDIR /hire-lane

# Copy the build artifacts from the builder stage
COPY --from=builder /hire-lane/dist ./dist
COPY --from=builder /hire-lane/package.json ./
COPY --from=builder /hire-lane/node_modules ./node_modules

# Copy the .env file (if it's part of the build process)
COPY .env .env

ENTRYPOINT [ "node", "--env-file=./.env", "./dist/hire-lane/main.js" ]

# Expose the application port
EXPOSE 4200
