// Vercel Serverless Function para React
// Esta función funciona con proyectos React desplegados en Vercel

import { Resend } from 'resend';

// Inicializar Resend solo si la API key está disponible
let resend;
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
} catch (error) {
  console.error('Error initializing Resend:', error);
}

export default async function handler(req, res) {
  // Configurar headers CORS y JSON desde el inicio
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verificar que el body existe y es un objeto
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid request body',
        details: 'Request body must be a valid JSON object'
      });
    }

    const { name, email, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format'
      });
    }

    // Validar longitud de campos
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ 
        error: 'Name must be between 2 and 100 characters'
      });
    }

    if (message.length < 10 || message.length > 2000) {
      return res.status(400).json({ 
        error: 'Message must be between 10 and 2000 characters'
      });
    }

    // Verificar que RESEND_API_KEY esté configurada y Resend esté inicializado
    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'Email service not configured',
        details: 'RESEND_API_KEY environment variable is missing'
      });
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'The unAgency Web <system@theunagencyco.com>',
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

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: error.message || 'Unknown error'
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Email sent successfully',
      id: data?.id
    });

  } catch (error) {
    console.error('Error processing request:', error);
    
    // Asegurar que siempre devolvemos JSON, incluso en caso de error
    try {
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error?.message || 'Unknown error occurred',
        type: error?.name || 'Error'
      });
    } catch (jsonError) {
      // Si incluso el JSON falla, devolver texto plano con headers JSON
      console.error('Failed to send JSON response:', jsonError);
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).end(JSON.stringify({ 
        error: 'Internal server error',
        details: 'Failed to process request'
      }));
    }
  }
}
