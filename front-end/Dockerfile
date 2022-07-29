FROM node:16-alpine as build

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install --production --frozen-lockfile

COPY . .

RUN yarn run build

FROM nginx:1.21.6-alpine
# RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/nextbank.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html