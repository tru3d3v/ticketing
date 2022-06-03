FROM ubuntu:latest as build-env

ARG NODE_VERSION=16

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends --no-upgrade curl sudo && \
    curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install -y --no-install-recommends --no-upgrade nodejs npm

RUN node --version

RUN mkdir -p /home/app
RUN mkdir -p /home/app/tmp

WORKDIR /home/app

COPY public /home/app/public
COPY *.js /home/app
COPY routes /home/app/routes
COPY services /home/app/services
COPY package.json /home/app/package.json

ADD entrypoint.sh /home/app/entrypoint.sh

RUN npm config set strict-ssl false
RUN npm install

ENTRYPOINT [ "sh","/home/app/entrypoint.sh" ]