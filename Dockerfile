# Stage 1
FROM node:18.0.0 as build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
# Stage 2
FROM nginx:alpine
COPY --from=build /app/dist/banking-frontend-angular /usr/share/nginx/html
EXPOSE 80