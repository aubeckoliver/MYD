FROM node:19

WORKDIR /app

COPY . .
RUN npm ci

ENTRYPOINT [ "node", "index.js" ]

EXPOSE 3002