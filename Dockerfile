FROM node:12

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]