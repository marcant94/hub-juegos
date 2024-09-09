# build environment
FROM node:20-alpine as build

# ARG BACK_DOMAIN
# ARG CLIENT_ID
# ARG CLIENT_SECRET

# ENV BACK_DOMAIN $BACK_DOMAIN
# ENV CLIENT_ID $CLIENT_ID
# ENV CLIENT_SECRET $CLIENT_SECRET

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH
# ENV PATH /app/yarn.lock.bin:$PATH

# COPY ./package.json ./
# COPY ./package*.json ./

COPY . .
RUN mv /app/nodebuild/node_modules /app/node_modules; exit 0
RUN mv /app/nodebuild/yarn.lock /app/yarn.lock; exit 0

RUN yarn --prod
RUN yarn build


# production environment
FROM nginx:stable-alpine

COPY --from=build /app/node_modules /tmp/node_modules
COPY --from=build /app/yarn.lock /tmp/yarn.lock
COPY --from=build /app/build /html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
