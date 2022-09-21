FROM node:lts-alpine as development
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
CMD npm run dev

FROM node:lts-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production --silent
COPY . .
RUN chown -R node /usr/src/app
USER node
CMD npm start
