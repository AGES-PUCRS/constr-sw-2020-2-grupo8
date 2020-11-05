FROM node:12

WORKDIR /usr/src/app

COPY ./backend .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]