FROM node:18-alpine as build

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . .

ENV WASP_API_URL http://localhost:9090
ENV L1_API_URL http://localhost:14265

RUN npm run build

FROM nginx:1.23-alpine

COPY --from=build /app/dist /usr/share/nginx/html/
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

CMD nginx -g 'daemon off;'