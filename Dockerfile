*//FROM node:16.15 as 

WORKDIR /app

COPY . .

RUN npm i

ENTRYPOINT npm start
