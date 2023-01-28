FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
# CMD ["ts-node", "src/server.ts"]
EXPOSE 5000