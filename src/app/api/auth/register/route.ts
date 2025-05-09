import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { models } from '@/utils/database';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', issues: parsed.error.format() },
      { status: 400 }
    );
  }

  const { email, password, name } = parsed.data;

  const existingUser = await models.users.findOne({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { error: 'Este correo ya está registrado' },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await models.users.create({
    email,
    name,
    hashed_password: hashedPassword,
  });

  return NextResponse.json(
    { user: { id: newUser.id, email: newUser.email } },
    { status: 201 }
  );
}
