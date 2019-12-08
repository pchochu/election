docker run --name election-postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=root -e POSTGRES_DB=election -p 5432:5432 -d postgres;
#docker run --name election-postgres-LDAP -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=root -e POSTGRES_DB=election-LDAP -p 5433:5433 -d postgres

