docker-compose -f docker-compose.build.yaml up
docker-compose -f docker-compose.seed.yaml up --abort-on-container-exit
docker-compose up