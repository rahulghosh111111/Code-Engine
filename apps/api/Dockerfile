FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm@12.6.0

# Copy workspace files from context root (repo root)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json

RUN pnpm install --filter api --frozen-lockfile

WORKDIR /app/apps/api

EXPOSE 4000
CMD ["pnpm","dev"]
