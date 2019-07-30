# build environment
FROM node:12.6.0-alpine as build
WORKDIR /app
COPY . ./

# environment variables are replaced in client app diring build by webpack
ENV SSO_URL=http://localhost:8230/auth
ENV KIE_URL=http://localhost:8080
ENV REACT_APP_RHSSO_REALM=reactapp-internal
ENV REACT_APP_RHSSO_CLIENT=kie-remote

RUN yarn
RUN yarn build

# runtime environment
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy .env configuration file and shell script to container
WORKDIR /usr/sare/nginx/html
COPY ./env.sh .
COPY .env .

# make the shell script executable
RUN chmod +x env.sh

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8080

# Setup javascript client configuration based in environment vars
RUN apk add --no-cache bash
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]