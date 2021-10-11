FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install
#RUN npm install pm2 --quiet

COPY . .