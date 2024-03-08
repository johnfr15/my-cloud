FROM node:alpine

WORKDIR /code

COPY ./package*.json .
RUN yarn install --only=prod
COPY . .

# Expose the port your app runs on
EXPOSE 8100

# Command to run your application
CMD [ "yarn", "start" ]