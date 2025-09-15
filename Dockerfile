FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]