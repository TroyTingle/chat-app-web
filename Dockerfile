# Stage 1: Build the React app using Vite
FROM node:20-alpine AS build

#Copy the .env file to the container
COPY .env.production .env

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built app using a lightweight web server
FROM nginx:1.27.4-alpine-slim

# Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
