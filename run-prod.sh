
docker compose -f ./docker-compose.yml up --build juegos_react_builder
docker compose -f ./docker-compose.yml up -d --build juegos_react_web
docker image prune -f

# docker logs --follow juegos_react_web
# docker exec -it juegos_react_web sh
