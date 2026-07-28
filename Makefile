# Use bash for deployment compatibility
SHELL := /bin/bash

.DEFAULT_GOAL := help

# Phony targets
.PHONY: help dev build preview lint fmt test clean set-node-version local-db

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

# Start dev server with sequential emulator health check
dev: set-node-version ## Set node version, boot local DB, and start Vite dev server
	@echo "Starting Firebase emulators..."
	@firebase emulators:start & \
	EMU_PID=$$!; \
	trap 'kill $$EMU_PID 2>/dev/null' EXIT INT TERM; \
	echo "Waiting for Firebase Emulators to respond..."; \
	until curl -s http://127.0.0.1:8080 >/dev/null; do sleep 0.5; done; \
	echo "Emulators online! Booting Vite..."; \
	pnpm run dev

# Build production bundle
build: ## Build production bundle
	pnpm run build

# Preview production build locally and open browser (macOS)
preview: build ## Preview production build on localhost and open browser
	pnpm run preview --port 4173 & sleep 1 && open http://localhost:4173

# Lint (assumes lint script exists)
lint: ## Run linter
	pnpm run lint

# Format (assumes format script exists)
fmt: ## Run formatter
	pnpm run format

# Run tests (assumes test script exists)
test: ## Run tests
	pnpm test

# Clean build artifacts
clean: fmt lint ## Remove build artifacts and caches
	rm -rf dist .vite node_modules/.vite

# Use the required node version
set-node-version: ## Uses the required node version for this project
	@export NVM_DIR="$$HOME/.nvm"; \
	[ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh"; \
	nvm use --lts

# Starts the emulator background process
local-db: ## Starts the Firebase emulators directly
	firebase emulators:start &
