#!/bin/bash

docker run \
    --name mysql-container \
    -e MYSQL_ROOT_PASSWORD=my-secret-pw \
    -e MYSQL_DATABASE=mydb \
    -p 3306:3306 \
    -d \
    mysql:latest
