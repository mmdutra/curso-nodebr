# Iniciando trabalhos com banco de dados relacional - Postgres

- Lista de comandos para criar o ambiente dockerizado
    * ### POSTGRES    
    docker run \
        --name postgres \
        -e POSTGRES_USER=mmoraisd \
        -e POSTGRES_PASSWORD=password \
        -e POSTGRES_DB=heroes \
        -p 5432:5432 \
        -d \
        postgres

    * ### ADMINER
    docker run \
        --name adminer \
        -p 8080:8080 \
        --link=postgres:postgres \
        -d \
        adminer

    * ### MONGODB
    docker run \
        --name mongodb \
        -p 27017:27017 \
        -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
        -e MONGO_INITDB_ROOT_PASSWORD=secret \
        -d \
        mongo

    * ### MONGO CLIENT
    docker run \
        --name mongoclient \
        -p 3000:3000 \
        --link mongodb:mongodb \
        -d \
        mongoclient/mongoclient

- Configurar novo usuario no mongo
    * docker exec -it mongodb \
    mongo --host localhost -u mongoadmin -p secret --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({ user: 'mmoraisd', pwd: 'root', roles:[{role:'readWrite', db: 'heroes'}]})"