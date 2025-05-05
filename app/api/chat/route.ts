import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  // Replace with Together.ai or OpenRouter endpoint
  const response = await fetch('https://api.together.xyz/inference', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    }),
  });

  const data = await response.json();

  return NextResponse.json({ message: data.choices[0].message.content });
}
