const { definePrismaConfig } = require('@prisma/cli-engine');

module.exports = definePrismaConfig({
  schema: './database/prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
