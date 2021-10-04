#!/usr/bin/bash

eval $(docker-machine env -u)

docker build -t registry.gitlab.com/karsegard/agency-website/bim-front .

docker push registry.gitlab.com/karsegard/agency-website/bim-front
