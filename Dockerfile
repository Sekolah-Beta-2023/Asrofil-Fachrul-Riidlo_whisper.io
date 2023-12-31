# Use the official Node.js 14 (LTS) image as the base image
FROM node:20.5-slim

# Set the working directory inside the container
WORKDIR /app

ARG API_URL_ARG
ENV API_URL $API_URL_ARG

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the Nuxt.js app source code to the container's working directory
COPY . .

# Install project dependencies
RUN npm install
RUN npm run build

# Expose the port that the Nuxt.js app will run on
EXPOSE 3000

# Command to start the Nuxt.js app
CMD ["npm", "run", "start"]
