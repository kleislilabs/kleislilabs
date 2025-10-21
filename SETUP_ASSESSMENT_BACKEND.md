# AI Readiness Assessment - Backend Setup Guide

## Current Implementation
The assessment now:
1. Collects user email at question 4
2. Stores responses locally during assessment
3. Submits data to `/api/assessment` when completed
4. Generates a downloadable report
5. Sends you a notification email with lead details

## Quick Setup Options

### Option 1: Resend (Recommended - 5 min setup)
1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Get your API key
3. Add to `.env.local`:
```
RESEND_API_KEY=your_key_here
```
4. Install: `npm install resend`

### Option 2: Google Sheets (No database needed - 10 min setup)
1. Create a Google Sheet
2. Use Google Apps Script to create a webhook:
   - Tools > Script editor
   - Deploy as web app
   - Get the URL
3. Add to `.env.local`:
```
GOOGLE_SHEETS_URL=your_webhook_url
```

### Option 3: Supabase (Full database - 15 min setup)
1. Create project at https://supabase.com
2. Create table:
```sql
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  phone TEXT,
  score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```
3. Add to `.env.local`:
```
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```
4. Install: `npm install @supabase/supabase-js`

## What You Get

### Lead Information
- Email address (required)
- Assessment score
- All question responses
- Timestamp of completion
- Contact information (if provided)

### Automatic Actions
1. **Email Notification to You**: Instantly know when someone completes
2. **Report Generation**: User gets a personalized HTML report
3. **Data Storage**: All responses saved for follow-up
4. **Download Capability**: Users can download their report

## Testing
1. Complete an assessment at `/ai-readiness`
2. Check your email for the notification
3. Verify the download button works
4. Check your database/sheet for the stored data

## Follow-up Strategy
When you receive a notification:
1. Review their score and answers
2. Send personalized follow-up within 24 hours
3. Offer specific solutions based on their pain points
4. Book a discovery call while they're engaged

## Email Template for Follow-up
```
Subject: Your AI Readiness Score: [SCORE]/10 - Let's Discuss Next Steps

Hi [Name],

Thank you for completing our AI Readiness Assessment! 

Based on your score of [SCORE]/10, you're [LEVEL] for AI implementation.

I noticed you mentioned [SPECIFIC CHALLENGE FROM THEIR ANSWERS]. This is exactly the type of challenge we help companies solve with our 4-week MVP approach.

Would you be available for a quick 30-minute call this week to discuss:
- Your specific AI opportunities
- A custom implementation roadmap
- How we've helped similar companies achieve $20K+ monthly savings

Book directly here: https://cal.com/ipm0b/discovery

Best regards,
[Your Name]
KleisliLabs
```

## Troubleshooting
- If emails aren't sending: Check API key and email service limits
- If data isn't storing: Verify database connection and permissions
- If report won't download: Check browser console for errors

## Next Steps
1. Choose your backend option (start with Resend for simplicity)
2. Set up environment variables
3. Test the full flow
4. Monitor incoming leads
5. Set up automated follow-up sequences (optional)