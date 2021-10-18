FROM node:16-alpine

WORKDIR /usr/app


RUN apk add --no-cache git
RUN git --version

RUN npm install -g npm@8.1.0
COPY package.json .
RUN npm install
#RUN npm install pm2 --quiet

COPY . .