FROM node:12.18.1-slim

ARG PORT=8888
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]