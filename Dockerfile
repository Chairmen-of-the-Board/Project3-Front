# Stage 1
FROM node:alpine
WORKDIR /app
COPY package.json .


RUN npm install
COPY . .
EXPOSE 4200
RUN npm run start
