import { NextRequest, NextResponse } from 'next/server';

// For now, we'll use a simple email notification system
// Later you can integrate with Supabase, MongoDB, or any database

interface AssessmentData {
  email: string;
  score: number;
  answers: Record<string, string | string[]>;
  completedAt: string;
  company?: string;
  name?: string;
  phone?: string;
}

// Helper to send email notifications
async function sendNotificationEmail(data: AssessmentData) {
  // For immediate implementation, we can use EmailJS or Resend
  // This sends you an email when someone completes the assessment
  
  const emailContent = `
    New AI Readiness Assessment Completed!
    
    Contact Information:
    - Name: ${data.name || 'Not provided'}
    - Email: ${data.email}
    - Company: ${data.company || 'Not provided'}
    - Phone: ${data.phone || 'Not provided'}
    - Score: ${data.score}/10
    - Completed: ${new Date(data.completedAt).toLocaleString()}
    
    Assessment Details:
    ${JSON.stringify(data.answers, null, 2)}
    
    Follow up with this lead ASAP!
  `;

  // Option 1: Use Resend (recommended - easy setup)
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
      const emailResult = await resend.emails.send({
        from: 'AI Assessment <onboarding@resend.dev>', // Use Resend's verified domain for testing
        to: process.env.NOTIFICATION_EMAIL || 'hello@kleislilabs.com',
        replyTo: data.email, // User can reply directly to the lead
        subject: `New Lead: ${data.email} - Score ${data.score}/10`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">New AI Readiness Assessment Completed</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Contact Information:</h3>
              <ul style="line-height: 1.8;">
                <li><strong>Name:</strong> ${data.name || 'Not provided'}</li>
                <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
                <li><strong>Company:</strong> ${data.company || 'Not provided'}</li>
                <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
                <li><strong>Score:</strong> <span style="font-size: 24px; color: #3b82f6; font-weight: bold;">${data.score}/10</span></li>
                <li><strong>Completed:</strong> ${new Date(data.completedAt).toLocaleString()}</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Assessment Details:</h3>
              <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(data.answers, null, 2)}</pre>
            </div>
            
            <div style="background: #d1fae5; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
              <h3 style="margin-top: 0;">Follow up with this lead ASAP</h3>
              <a href="mailto:${data.email}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 10px;">Reply to Lead</a>
            </div>
          </div>
        `,
      });
      console.log('Email sent successfully:', emailResult);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't throw - we still want to save the data even if email fails
    }
  }

  // Option 2: Store in Google Sheets (no database needed)
  if (process.env.GOOGLE_SHEETS_URL) {
    await fetch(process.env.GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}

// Generate a simple PDF report
function generateReport(data: AssessmentData) {
  // Basic HTML report that can be converted to PDF client-side
  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Readiness Report - ${data.company || 'Your Company'}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        .header { background: #3b82f6; color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
        .score-card { background: #f3f4f6; padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0; }
        .score { font-size: 48px; font-weight: bold; color: #3b82f6; }
        .recommendation { background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .next-steps { background: #d1fae5; padding: 20px; border-radius: 10px; margin: 20px 0; }
        h1 { margin: 0; }
        h2 { color: #1f2937; margin-top: 30px; }
        ul { line-height: 1.8; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>AI Readiness Assessment Report</h1>
        <p>Prepared for: ${data.name || data.email}</p>
        <p>Date: ${new Date(data.completedAt).toLocaleDateString()}</p>
      </div>
      
      <div class="score-card">
        <div class="score">${data.score}/10</div>
        <h3>${data.score >= 8 ? 'Advanced' : data.score >= 6 ? 'Intermediate' : data.score >= 4 ? 'Developing' : 'Beginning'} Level</h3>
        <p>${
          data.score >= 8 ? "Excellent! Your organization is primed for AI transformation." :
          data.score >= 6 ? "Great foundation! You're well-positioned to start meaningful AI initiatives." :
          data.score >= 4 ? "Good start! With targeted improvements, you'll be ready for impactful AI adoption." :
          "Perfect timing! We'll help you build a solid foundation for successful AI implementation."
        }</p>
      </div>
      
      <h2>Key Recommendations</h2>
      <div class="recommendation">
        <h3>🎯 Immediate Actions</h3>
        <ul>
          <li>Schedule a discovery call to discuss your specific AI opportunities</li>
          <li>Identify 1-2 high-impact processes for AI automation</li>
          <li>Begin collecting and organizing data for AI readiness</li>
        </ul>
      </div>
      
      <div class="next-steps">
        <h3>🚀 Your Next Steps</h3>
        <ul>
          <li>Book a complimentary strategy session with our AI specialists</li>
          <li>Get your personalized AI Implementation Roadmap</li>
          <li>Join our exclusive AI Transformation Workshop</li>
          <li>Explore real-world AI success stories from our portfolio</li>
        </ul>
      </div>
      
      <h2>How KleisliLabs Can Help</h2>
      <p>Based on your assessment, we recommend starting with a 4-week MVP sprint to:</p>
      <ul>
        <li>Build a proof-of-concept AI solution for your highest-impact use case</li>
        <li>Demonstrate measurable ROI to stakeholders</li>
        <li>Create a scalable foundation for future AI initiatives</li>
        <li>Train your team on AI best practices</li>
      </ul>
      
      <p><strong>Ready to start?</strong> Reply to this email or book a call at https://cal.com/ipm0b/discovery</p>
      
      <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
        <p>© 2025 KleisliLabs | hello@kleislilabs.com</p>
      </div>
    </body>
    </html>
  `;
  
  return reportHTML;
}

// Send confirmation email to user
async function sendUserConfirmationEmail(data: AssessmentData) {
  if (!process.env.RESEND_API_KEY || !data.email) return;
  
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'KleisliLabs <onboarding@resend.dev>',
      to: data.email,
      subject: 'Your AI Readiness Assessment is Complete!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6;">Thank you for completing the assessment!</h2>
          <p>Hi ${data.name || 'there'},</p>
          <p>Your AI Readiness Score is <strong>${data.score}/10</strong>.</p>
          <p>Visit the results page to download your detailed PDF report with personalized recommendations.</p>
          <p>We'll be in touch soon to discuss how we can help accelerate your AI journey.</p>
          <p>Best regards,<br>The KleisliLabs Team</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send user confirmation:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: AssessmentData = await request.json();
    
    // Validate required fields
    if (!data.email || !data.score) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Send notification emails (non-blocking)
    sendNotificationEmail(data).catch(console.error);
    sendUserConfirmationEmail(data).catch(console.error);
    
    // Generate report
    const report = generateReport(data);
    
    // Store in database (implement based on your choice)
    // For quick start, you can use:
    // 1. Supabase (free, easy setup)
    // 2. MongoDB Atlas (free tier)
    // 3. Google Sheets (simplest, no database needed)
    // 4. Airtable (good for CRM-like features)
    
    // Return success with report
    return NextResponse.json({
      success: true,
      message: 'Assessment completed successfully',
      report: report,
      downloadUrl: `/api/assessment/download?id=${Date.now()}` // You can implement this endpoint
    });
    
  } catch (error) {
    console.error('Assessment submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Endpoint to retrieve assessments (protected - add authentication)
  // This is where you'd fetch from your database
  
  return NextResponse.json({
    message: 'Use POST to submit assessment data'
  });
}