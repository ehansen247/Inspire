FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY dist/ /dist/

EXPOSE 8081

CMD [ "node", "server.js" ]


