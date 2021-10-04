#!/usr/bin/bash

eval $(docker-machine env wedplan-manager-2)
docker stack deploy --with-registry-auth -c docker-compose.yml bim
eval $(docker-machine env -u)
