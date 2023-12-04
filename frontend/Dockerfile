FROM node:20-alpine As development
WORKDIR /app
COPY package*.json .
RUN npm install -g @angular/cli
RUN npm install && npm cache clean --force
COPY . .
EXPOSE 3000
CMD ["ng", "serve", "--host=0.0.0.0", "--port=4200"]
