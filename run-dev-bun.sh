
docker-compose -f ./dockerdev-bun-compose.yml up -d --build
docker image prune -f
docker logs --follow juegos_react_dev_bun
# docker exec -it juegos_react_dev_bun sh
