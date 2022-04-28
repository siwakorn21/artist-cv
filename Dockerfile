FROM node:16.14-buster-slim AS builder

WORKDIR '/app'

COPY ./package.json .

COPY ./yarn.lock .

COPY ./.yarnrc .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html