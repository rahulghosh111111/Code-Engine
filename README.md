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
