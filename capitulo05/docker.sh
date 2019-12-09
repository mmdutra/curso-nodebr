#!/bin/bash

echo 'iniciando container do postgres'
docker run \
    --name postgres \
    -e POSTGRES_USER=mmoraisd \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

echo 'iniciando container do adminer'
docker run \
    --name adminer \
    -p 8080:8080 \
    --link=postgres:postgres \
    -d \
    adminer

echo 'iniciando container do mongo'
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo

echo 'iniciando container do mongoclient'
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

