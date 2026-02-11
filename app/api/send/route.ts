import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: 'The unAgency hello@theunagencyco.com',
      to: ['martin.plascencia@theunagencyco.com'],
      subject: `New Project Inquiry from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; background: #000; color: #fff; padding: 20px;">
          <h2 style="color: #FF4D00;">New Inquiry: The unAgency</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> </p>
          <p style="background: #111; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
