# build environment
FROM node:12.6.0-alpine as build
WORKDIR /app
COPY . ./

# environment variables are replaced in client app diring build by webpack
ENV REACT_APP_RHSSO_URL=http://localhost:8230/auth
ENV REACT_APP_KIE_SERVER_URL=http://localhost:8080
ENV REACT_APP_RHSSO_REALM=kie-realm
ENV REACT_APP_RHSSO_CLIENT=kie-remote

RUN yarn
RUN yarn build

# runtime environment
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]