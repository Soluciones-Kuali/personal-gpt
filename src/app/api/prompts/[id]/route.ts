import { NextResponse } from 'next/server';

import sequelize, { models } from '@/utils/database';
import { auth } from '@/auth';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const id = (await params).id;

  await sequelize.authenticate();

  const prompt = await models.user_prompts.findByPk(id);

  await prompt?.destroy();

  return NextResponse.json({ ok: true });
}
