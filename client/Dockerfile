# ------------ deps stage ------------
FROM node:18-alpine AS deps
WORKDIR /app

# Install only what we need (lock-file if present)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# ------------ runner stage ------------
FROM node:18-alpine
WORKDIR /app

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source
COPY . .

# Vite dev server port
EXPOSE 5173

CMD ["npm", "run", "dev"]

#  copies all the dep and runs npm run build which creates static files of the clientside codebase
# uses nginx-webserver to run these static files and see it run on the web browser