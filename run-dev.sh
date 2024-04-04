
docker-compose -f ./dockerdev-compose.yml up -d --build
docker image prune -f
docker logs --follow juegos_react_dev
# docker exec -it juegos_react_dev sh
