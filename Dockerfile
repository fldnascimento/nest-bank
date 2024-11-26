FROM node:22-alpine

WORKDIR /app-bank

COPY package* .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "start:dev" ]