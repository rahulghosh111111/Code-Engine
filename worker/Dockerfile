FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm@12.6.0

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY worker/package.json ./worker/package.json
COPY worker/src ./worker/src

RUN pnpm install --filter worker --frozen-lockfile

WORKDIR /app/worker

EXPOSE 3001
CMD ["pnpm","start"]
