# 1️⃣ Base image (Node installed)
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of the code
COPY . .

# 6️⃣ Expose port (informational)
EXPOSE 5000

# 7️⃣ Start app
CMD ["node", "server.js"]
