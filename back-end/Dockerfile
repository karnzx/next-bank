FROM node:16-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install --production --frozen-lockfile

COPY . .

CMD ["node", "src/main.js"]
