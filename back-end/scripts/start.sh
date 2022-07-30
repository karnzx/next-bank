#!/bin/bash

echo "Launching MongoDB in Docker...."
docker run -p 27021:27021 -d --name mongodb mongo
docker restart mongodb
echo "Launching back-end...."
npx nodemon ./src/main.js
