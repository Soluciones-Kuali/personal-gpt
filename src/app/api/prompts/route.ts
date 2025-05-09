import { NextRequest, NextResponse } from 'next/server';

import sequelize, { models } from '@/utils/database';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const prompts = await models.user_prompts.findAll({
    where: { user_id: session.user.id },
  });

  return NextResponse.json(prompts);
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { prompt }: { prompt: string } = await req.json();

  await sequelize.authenticate();

  const newPrompt = await models.user_prompts.create({
    user_id: session.user.id,
    prompt,
  });

  return NextResponse.json({ message: newPrompt });
}
