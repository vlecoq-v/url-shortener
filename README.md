# url-shortener

ts express postgres url-shortener

## Development

### Starting the project

The project is dockerized and comes with a Makefile to simplify docker commands.

Run `make` to see a list of available commands.

Run `make docker.build docker.logs` to start the project

### running migration

update the prisma files, exec into the docker, run `npx prisma generate dev`, log out, run `npx prixma generate --schema=./src/prisma/schema.prism` start back the app
