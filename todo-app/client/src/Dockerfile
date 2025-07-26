FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (default for React dev server)
EXPOSE 5173

# Run React dev server
CMD ["npm", "run", "dev"]