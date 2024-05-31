# Use Node.js image as base
FROM node:14-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --quiet

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Use lightweight Node.js image for serving built app
FROM node:14-alpine AS production

# Set working directory
WORKDIR /app

# Copy built app from previous stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["npx", "serve", "-s", "build"]

# Run the container as non-root user
USER node
