FROM node:16.15.0 as build
WORKDIR /var/jenkins_home/workspace/sinbangsa_front_web/FRONT/escape_web
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
FROM nginx:stable-alpine as production-stage
# # RUN mkdir ./build
COPY --from=build /var/jenkins_home/workspace/sinbangsa_front_web/FRONT/escape_web/build /usr/share/nginx/html
COPY --from=build /var/jenkins_home/workspace/sinbangsa_front_web/FRONT/escape_web/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;"]


# WORKDIR "/usr/src/app"
# COPY package.json ./
# RUN npm install
# COPY ./ ./
# CMD  ["npm","run","start"]
