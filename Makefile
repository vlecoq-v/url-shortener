.PHONY: help

.DEFAULT_GOAL := help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA.Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

docker.up: ## run the app inside docker via docker-compose
	docker-compose --compatibility up -d

docker.build: ## build the app inside docker via docker-compose
	docker-compose --compatibility up --build -d

docker.logs: ## show the logs of the app
	docker-compose logs -f

down: ## shuts down project dockers
	docker-compose down