
FROM ubuntu:18.04

WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install curl gnupg -y

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y nodejs mongodb

COPY . .

RUN cd /backend && npm install

EXPOSE 3333

ENTRYPOINT "./entrypoint.sh"