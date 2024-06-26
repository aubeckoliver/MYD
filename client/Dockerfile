#Stage 1

FROM node:17-alpine as builder

WORKDIR /app

ENV REACT_APP_BACKEND_BASE_URL=http://localhost:30002

COPY . .
RUN npm install
RUN npm run build


#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx","-g","daemon off;"]