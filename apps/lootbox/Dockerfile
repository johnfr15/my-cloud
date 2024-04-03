FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN yarn install-client --only=production

COPY server/package*.json server/
RUN yarn install-server --only=production

COPY client/ client/
RUN yarn build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 80