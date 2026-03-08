// Vercel Serverless Function for Contact Form
export default async function handler(req, res) {
    // Enable CORS for your domain
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                error: 'All fields are required',
                success: false 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format',
                success: false 
            });
        }

        // Get environment variables
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'markharvey.leduna@gmail.com';

        // Email content
        const emailSubject = `Portfolio Contact: ${subject}`;
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                </div>
                <div style="margin: 20px 0;">
                    <h3>Message:</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 12px;">
                        This email was sent from your portfolio contact form.
                    </p>
                </div>
            </div>
        `;

        // If Resend API key is configured, send email
        if (RESEND_API_KEY) {
            try {
                const resendResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'Portfolio Contact <onboarding@resend.dev>', // Change this to your verified domain
                        to: CONTACT_EMAIL,
                        reply_to: email,
                        subject: emailSubject,
                        html: emailHtml,
                    }),
                });

                const resendData = await resendResponse.json();

                if (!resendResponse.ok) {
                    console.error('Resend error:', resendData);
                    throw new Error('Failed to send email via Resend');
                }

                console.log('Email sent successfully via Resend:', resendData);
            } catch (emailError) {
                console.error('Email sending error:', emailError);
                // Continue even if email fails - we still log the submission
            }
        }

        // Always log the submission (can be viewed in Vercel logs)
        console.log('Contact form submission:', {
            timestamp: new Date().toISOString(),
            name,
            email,
            subject,
            message: message.substring(0, 100) + '...',
        });

        // Return success response
        return res.status(200).json({ 
            success: true,
            message: RESEND_API_KEY 
                ? 'Message sent successfully! I will get back to you soon.' 
                : 'Message received! I will get back to you soon.',
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ 
            error: 'Failed to send message. Please try again later.',
            success: false 
        });
    }
}
