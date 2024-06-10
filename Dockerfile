FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 3000

RUN npm run build

FROM nginx:1.23.3-alpine

COPY ./nginx.conf /etc/nginx/config.d/default.conf 

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
