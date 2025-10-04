.PHONY: help dev-up dev-down server-run app-run test clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev-up: ## Start development environment (PostgreSQL, MinIO)
	./scripts/dev.up.sh

dev-down: ## Stop development environment
	./scripts/dev.down.sh

server-run: ## Run Spring Boot server
	cd server && ./mvnw spring-boot:run

app-run: ## Run React Native app
	cd app && npm start

test: ## Run all tests
	cd server && ./mvnw test
	cd app && npm test

clean: ## Clean all build artifacts
	cd server && ./mvnw clean
	cd app && rm -rf node_modules

db-migrate: ## Run database migrations
	cd server && ./mvnw flyway:migrate

db-seed: ## Seed database with demo data
	@echo "Demo data is seeded automatically with migrations"