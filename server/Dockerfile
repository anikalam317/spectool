FROM node:14 AS builder
RUN npm install --global create-react-app\
  && mkdir /app
WORKDIR /app
COPY ui/src src/
COPY ui/public public/
COPY ui/package.json ui/tsconfig.json /app/
RUN yarn\
 && yarn build

FROM nginx
COPY ./server/app.conf /etc/nginx/conf.d/.
#COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY --from=builder /app/build/ /usr/share/nginx/html/spectool/
