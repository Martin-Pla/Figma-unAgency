// Next.js API Route
// Esta ruta funciona si migras el proyecto a Next.js

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar Resend solo si la API key está disponible
let resend: Resend | null = null;
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
} catch (error) {
  console.error('Error initializing Resend:', error);
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { 
          error: 'Invalid request body',
          details: 'Request body must be valid JSON'
        },
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    const { name, email, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: 'Name, email, and message are required'
        },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validar longitud de campos
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Verificar que RESEND_API_KEY esté configurada y Resend esté inicializado
    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { 
          error: 'Email service not configured',
          details: 'RESEND_API_KEY environment variable is missing'
        },
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'The unAgency Contact <onboarding@resend.dev>', // Cambia esto con tu dominio verificado
      to: 'hello@theunagencyco.com',
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #171717; border-bottom: 1px solid #262626; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #171717; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #737373;">
            <p>This email was sent from the contact form on The unAgency website.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from the contact form on The unAgency website.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: error.message || 'Unknown error'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Email sent successfully',
        id: data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    
    // Asegurar que siempre devolvemos JSON
    try {
      return NextResponse.json(
        { 
          error: 'Internal server error',
          details: error instanceof Error ? error.message : 'Unknown error occurred',
          type: error instanceof Error ? error.name : 'Error'
        },
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (jsonError) {
      // Si incluso el JSON falla, devolver respuesta básica
      console.error('Failed to send JSON response:', jsonError);
      return new NextResponse(
        JSON.stringify({ 
          error: 'Internal server error',
          details: 'Failed to process request'
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
}

// Manejar OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
