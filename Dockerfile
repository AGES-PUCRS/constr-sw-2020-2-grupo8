FROM ubuntu:20.04

WORKDIR /usr/src/app

COPY ./backend .

RUN apt-get update && apt-get install curl gnupg -y

RUN curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -

RUN sudo apt-get install -y nodejs

RUN npm install

EXPOSE 3000

ENTRYPOINT "./entrypoint.sh"