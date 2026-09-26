FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm@12.6.0

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/web/src ./apps/web/src
COPY apps/web/next.config.js ./apps/web/next.config.js
COPY apps/web/tailwind.config.js ./apps/web/tailwind.config.js
COPY apps/web/postcss.config.js ./apps/web/postcss.config.js

RUN pnpm install --filter web --frozen-lockfile

WORKDIR /app/apps/web

EXPOSE 3000
CMD ["pnpm","dev"]
