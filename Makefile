# Use bash for deployment compatibility
SHELL := /bin/bash

.DEFAULT_GOAL := help

# Phony targets
.PHONY: help \
	web api db dev \
	docker-web docker-api docker-db docker-up docker-down docker-db-nuke docker-nuke \
	openapi-regen \
	build test lint fmt clean

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ==============================================================================
# Native Local Targets
# ==============================================================================

web: ## Start Angular 22+ frontend natively ($root/web)
	@echo "[TODO] Starting web natively..."

api: ## Start .NET 10 Modular-Monolith API natively ($root/api)
	@echo "[TODO] Starting api natively..."

db: ## Start local PostgreSQL 17 instance
	@echo "[TODO] Starting db..."

dev: ## Start full stack natively (db + api + web)
	@echo "[TODO] Starting full stack natively..."

# ==============================================================================
# Docker Counterpart Targets
# ==============================================================================

docker-web: ## Run Angular 22+ frontend container via Docker Compose
	@echo "[TODO] Running web in Docker..."

docker-api: ## Run .NET 10 API container via Docker Compose
	@echo "[TODO] Running api in Docker..."

docker-db: ## Run PostgreSQL 17 + Mailpit containers via Docker Compose
	@echo "[TODO] Running db in Docker..."

docker-up: ## Run full stack (db + api + web) in Docker Compose
	@echo "[TODO] Starting full stack in Docker..."

docker-down: ## Stop running Docker Compose containers (preserves volumes)
	@echo "[TODO] Stopping Docker containers..."

docker-db-nuke: ## Destroy only the PostgreSQL container & data volume, then restart clean db
	@echo "[TODO] Nuking Docker db volume..."

docker-nuke: ## Destroy all project containers, volumes, networks, local images & orphans
	@echo "[TODO] Nuking all Docker state..."

# ==============================================================================
# Codegen & Quality Targets
# ==============================================================================

openapi-regen: ## Build .NET 10 OpenAPI 3.1 spec (api/openapi/v1.json) & regenerate Angular TypeScript client
	@echo "[TODO] Regenerating OpenAPI 3.1 spec and Angular client..."

build: ## Build production bundles for web and api
	@echo "[TODO] Building web and api..."

test: ## Run unit and integration tests
	@echo "[TODO] Running tests..."

lint: ## Run linters across web and api
	@echo "[TODO] Running linters..."

fmt: ## Format code across web and api
	@echo "[TODO] Formatting code..."

clean: ## Remove build artifacts and caches
	@echo "[TODO] Cleaning artifacts..."
