import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const invite_key = searchParams.get('invite_key');
  console.log(invite_key);
  if (invite_key) {
    cookies().set('invite_key', invite_key);
  }
  return NextResponse.redirect('http://localhost:3000/sign-in');
};
