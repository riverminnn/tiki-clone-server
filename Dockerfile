# Use Node.js LTS (Long Term Support) as the base image
FROM node:22

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Argument for port
ARG PORT=8080

# Set environment variable for the port
ENV PORT=$PORT

# Expose the port the app runs on
EXPOSE $PORT

# Command to run the application
CMD ["npm", "start"]
