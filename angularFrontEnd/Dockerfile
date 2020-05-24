# Stage 1 Build
FROM node:12-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build_prod


# # Stage 2 Run
# FROM node:12-alpine
# COPY --from=build /usr/src/app/dist

# # For Non-Root User Testing (locally); necessary for build on Heroku
# RUN adduser -D myuser
# USER myuser

CMD [ "node", "server.js" ]


