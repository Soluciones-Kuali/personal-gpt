import { NextRequest, NextResponse } from 'next/server';
import sequelize, { models } from '@/utils/database';
import axios from 'axios';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });

  await sequelize.authenticate();

  const body: { message: string, temperature: string } = await req.json();

  try {
  const prompts = await models.user_prompts.findAll({
    where: { user_id: session.user.id },
  });

  const promptsText = prompts.map(p => p.prompt).join(', ');
  const cleanedPrompts = promptsText.replace(/[^a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ.,;:()\-\n]/g, '');

  const prompt = `
  ${cleanedPrompts}
  
  ${body.message}
  `;

    // Call OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: `${process.env.OPENAI_MODEL}`, 
      messages: [{ role: 'user', content: prompt }],
      temperature: body.temperature || 0.3
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiReply = response.data.choices[0].message.content.trim();
    return NextResponse.json(aiReply);
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'An error occurred during evaluation' }, { status: 500 });
  }

}
