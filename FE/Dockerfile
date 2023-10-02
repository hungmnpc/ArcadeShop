FROM node:16.14

COPY --chown=node:node package.json package-lock.json* ./
COPY --chown=node:node . .
RUN npm i


CMD npm start