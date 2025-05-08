import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body: { message: string } = await req.json();

  return NextResponse.json({ message: body.message });
}
