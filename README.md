# Code Engine

A monorepo for a browser-based IDE, backend API, compilation engine, workers, and language runners.

## Overview
- **apps/web** – Front‑end IDE (Monaco editor, file explorer, terminal, output view).
- **apps/api** – REST API + WebSocket services.
- **engine** – Core project scanning, dependency resolution, build orchestration, execution sandbox.
- **worker** – Background job processing.
- **runners** – Docker images for each language runtime.
- **packages** – Shared TypeScript types and protocol definitions.
- **infra** – Docker compose and Nginx configuration.

See the directory tree in the repository for detailed layout.


``` 
docker compose -f infra/docker/docker-compose.yml up -d

docker compose -f infra/docker/docker-compose.yml down

docker compose -f infra/docker/docker-compose.yml ps



docker compose -f infra/docker/docker-compose.yml up --build -d

# See Web UI logs
docker logs docker-web-1 -f

# See API server logs
docker logs docker-api-1 -f



```