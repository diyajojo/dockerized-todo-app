# 1. Use Node.js as the base image
FROM node:18

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (if present)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app code
COPY . .

# 6. Expose the port your app runs on
EXPOSE 8000

# 7. Define the command to run your app
CMD ["node", "server.js"]
