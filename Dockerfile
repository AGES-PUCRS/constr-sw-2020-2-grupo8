FROM ubuntu:18.04

WORKDIR /usr/src/app

COPY ./backend .

RUN apt-get update && apt-get install curl gnupg -y

RUN curl -sL https://deb.nodesource.com/setup_12.x%7C bash -

RUN apt-get install build-essential nodejs mongodb -y

RUN npm install

EXPOSE 3000

ENTRYPOINT "./entrypoint.sh"