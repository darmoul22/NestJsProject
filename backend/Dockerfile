ARG NODE_VERSION
FROM node:$NODE_VERSION AS development
ARG PORT
WORKDIR /home/backend 
COPY package*.json .
RUN npm install && npm cache clean --force
COPY . .
EXPOSE $PORT
CMD ["npm", "run", "start:dev"]