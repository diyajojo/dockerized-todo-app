# ------------ deps stage ------------
    FROM node:18-alpine AS deps
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci --production
    COPY . .
    
    # ------------ runner stage ------------
    FROM node:18-alpine
    WORKDIR /app
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY --from=deps /app/index.js ./index.js
    COPY --from=deps /app/index.js ./index.js
    
    EXPOSE 3000
    
    CMD ["node", "index.js"]

    #alpine used to build lightweight images
    #dep stage : copies dep needed only for production from node_modules , copies code to run index.js , creates an image for this 
    #runner stage: uses this image to run index.js to create the actualy lightweight image 