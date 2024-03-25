# build stage
FROM node:16 as build-stage
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
EXPOSE 80 443

RUN mkdir /app
COPY --from=build-stage /app/build /app