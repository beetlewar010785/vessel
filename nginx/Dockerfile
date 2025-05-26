FROM node:20-alpine as frontend-builder

WORKDIR /app

COPY ../client/package*.json ./
RUN npm install

COPY ../client .
RUN npm run build

FROM nginx:stable

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=frontend-builder /app/build /usr/share/nginx/html
