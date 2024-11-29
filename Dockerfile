FROM node:22-alpine

WORKDIR /app-bank

COPY package* .

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]