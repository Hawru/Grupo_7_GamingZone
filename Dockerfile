FROM node:16.15 as build

WORKDIR /app

COPY . .

RUN npm i

ENTRYPOINT npm start
