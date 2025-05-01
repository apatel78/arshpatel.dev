import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Check if the output path in schema.prisma needs adjustment
// Default location assumes `node_modules/.prisma/client`
// If using custom output like `../lib/generated/prisma`,
// adjust the import path accordingly if necessary.
// For default setup, '@prisma/client' should work after generation.

export const prisma =
  global.prisma ||
  new PrismaClient({
    // log: ['query'], // Optional: Log Prisma queries
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma; 