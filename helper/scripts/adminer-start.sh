docker run --link election-postgres:5432 -p 8080:8080 adminer
#docker run --link election-postgres-LDAP:5433 --link election-postgres:5432 -p 8080:8080 adminer


