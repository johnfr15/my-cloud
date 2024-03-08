FROM node:alpine

WORKDIR /code

COPY ./package*.json .
RUN yarn install --only=prod
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to run your application
CMD [ "yarn", "vite", "--host", "0.0.0.0" ]