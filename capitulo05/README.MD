# Iniciando trabalhos com banco de dados relacional - Postgres

- Lista de comandos para criar o ambiente dockerizado
    * ### POSTGRES    
    docker run --name postgres -e "POSTGRES_USER=user_name" -e "POSTGRES_PASSWORD=password" -p PORT:PORT -d postgres

    * ### ADMINER
    docker run --name adminer -p PORT:PORT --link=postgres/postgres -d adminer

    * ### MONGODB
    docker run --name mongodb -p 27017:27017 -e "MONGO_INITDB_ROOT_USERNAME=user_name" -e "MONGO_INITDB_PASSWORD=password" -d mongo:version

    * ### MONGO CLIENT
    docker run mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
