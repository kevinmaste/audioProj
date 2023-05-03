FROM node:latest
LABEL authors="kevin"
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["nodemon", "app.js"]






