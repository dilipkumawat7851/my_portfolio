import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate request
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Here you can add your database logic (e.g., MongoDB, PostgreSQL)
    // Or send an email using Resend, Nodemailer, etc.
    
    // For now, we simulate a successful save/email send
    console.log('Received contact submission:', { name, email, message });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
