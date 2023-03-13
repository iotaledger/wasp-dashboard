FROM node:18-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23-alpine

ENV WASP_API_URL http://localhost:9090
ENV L1_API_URL http://localhost:14265

COPY --from=build /app/dist /usr/share/nginx/html/
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Default port exposure
EXPOSE 80
# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

CMD echo WASP_API_URL=[$WASP_API_URL] && echo L1_API_URL=[$L1_API_URL] && \
  sed -i "s+##WASP_API_URL##+$WASP_API_URL+g" /usr/share/nginx/html/assets/*.js && \
  sed -i "s+##L1_API_URL##+$L1_API_URL+g" /usr/share/nginx/html/assets/*.js && \
  nginx -g 'daemon off;'