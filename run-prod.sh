
docker compose -f ./docker-compose.yml up -d --build
docker image prune -f

docker logs --follow juegos_react
# docker exec -it juegos_react sh
