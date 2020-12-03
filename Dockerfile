# FROM ubuntu:20.04

# WORKDIR /usr/src/app

# COPY ./backend .

# RUN apt-get update && apt-get install curl gnupg -y

# RUN curl -sL https://deb.nodesource.com/setup_15.x
# #RUN curl --silent --location https://deb.nodesource.com/setup_15.x | sudo bash -

# #RUN sudo apt-get install -y nodejs
# RUN apt-get install -y nodejs

# RUN npm install

# EXPOSE 3000

# ENTRYPOINT "./entrypoint.sh"


FROM ubuntu:18.04

WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install curl gnupg -y

RUN curl -sL https://deb.nodesource.com/setup_12.x%7C bash -

RUN apt-get install -y nodejs

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT "./docker/entrypoint.sh"