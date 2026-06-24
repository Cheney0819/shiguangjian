import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result: Record<string, unknown> = {};

  // 1. 环境变量
  result.JWT_SECRET = process.env.JWT_SECRET ? 'set' : 'MISSING';
  result.DATABASE_URL = process.env.DATABASE_URL
    ? 'set'
    : 'MISSING';

  // 2. Prisma 连接
  try {
    const { prisma } = await import('@/lib/prisma');
    const rows = await prisma.$queryRaw`SELECT 1 as ok`;
    result.DB = { status: 'connected', rows };
  } catch (e: unknown) {
    result.DB = {
      status: 'FAILED',
      message: e instanceof Error ? e.message : String(e),
    };
  }

  return NextResponse.json(result);
}
