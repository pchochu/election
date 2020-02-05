docker run -d -p 80:3000 --add-host=database:container_ip_address image_name
docker run -d -p 80:3000 --restart unless-stopped --add-host=database:172.17.0.2 xchochu/electionprop 