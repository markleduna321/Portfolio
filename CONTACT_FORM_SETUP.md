# Contact Form Setup Guide

The contact form is now fully functional and will work when deployed to Vercel!

## How It Works

- **Development**: Form submissions are logged to the console
- **Production**: Form submissions are logged to Vercel function logs and optionally sent via email

## Setting Up Email (Optional but Recommended)

### Option 1: Resend (Recommended for Vercel)

Resend is the easiest email service to set up with Vercel, with a generous free tier.

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create a free account

2. **Get your API key**:
   - Go to API Keys in your Resend dashboard
   - Create a new API key
   - Copy the key

3. **Add to Vercel**:
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add: `RESEND_API_KEY` = `your_api_key_here`
   - Redeploy your site

4. **Verify a domain** (Optional, for production):
   - In Resend dashboard, go to Domains
   - Add and verify your domain
   - Update the `from` field in `/api/contact.js` to use your domain
   - Example: `from: 'Contact Form <contact@yourdomain.com>'`

### Option 2: Alternative Services

You can also use:
- **SendGrid**: Popular email service with good free tier
- **AWS SES**: Great if you're already using AWS
- **Mailgun**: Another reliable option

## Testing Locally

To test the contact form locally:

```bash
npm run dev
```

Fill out the form and submit. Check your browser console and terminal for logs.

## Viewing Submissions in Production

Even without email setup, all form submissions are logged:

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Functions" tab
4. Click on the `/api/contact` function
5. View the logs to see all submissions

## Current Behavior

- ✅ Form validation (required fields, email format)
- ✅ Loading states and error handling
- ✅ Success/error messages to users
- ✅ Logs all submissions to Vercel function logs
- ⚙️ Email sending (optional - requires API key)

## Security Features

- CORS headers configured
- Input validation and sanitization
- Rate limiting (handled by Vercel)
- Secure environment variables

## Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify `/api/contact.js` file exists
- Check Vercel function logs

**Not receiving emails?**
- Verify `RESEND_API_KEY` environment variable is set
- Check Vercel function logs for errors
- Verify email address in environment variables

**Testing email locally?**
- Vercel environment variables don't work in local dev
- Create a `.env.local` file with your API key
- Or just check the Vercel function logs after deployment

## Contact Information

Even if the form has issues, visitors can still reach you via:
- Email: markharvey.leduna@gmail.com
- Phone: +63995982241
- LinkedIn, GitHub, Stack Overflow (linked on the page)
