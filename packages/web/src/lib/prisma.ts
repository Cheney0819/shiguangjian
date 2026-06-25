import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// 开发时检查 DATABASE_URL 是否配置
if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL 环境变量未设置！');
  console.error('   请在 EdgeOne 控制台的项目设置 → 环境变量中添加 DATABASE_URL');
  console.error('   或在 .env.production 文件中配置（需确保 EdgeOne 能读取）');
}
