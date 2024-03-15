FROM node:alpine AS build

# Stage 1: build the front-end

# get the base path to set it in the environment of the front-end BEFORE we build it
# so it will be reflected in the app
ARG SERVICE_BASE_PATH
ENV VITE_SERVICE_BASE_PATH=${SERVICE_BASE_PATH}

WORKDIR /code

COPY ./client/package*.json .
RUN yarn install
COPY ./client/ .
RUN yarn run build

# Stage 2: Final image
FROM node:alpine

WORKDIR /code

COPY --from=build /code/public ./src/public
COPY ./server/package*.json .
RUN yarn install --only=prod
COPY ./server/ .

EXPOSE 80

CMD [ "yarn", "start" ]