import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generatePDFReport } from '@/lib/pdf-generator';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate PDF as blob
    const pdfBlob = generatePDFReport(data);
    const pdfBuffer = await pdfBlob.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    
    // HTML report generation is available if needed
    // const htmlReport = generateHTMLReport(data);
    
    // Send email with PDF attachment
    const emailResult = await resend.emails.send({
      from: 'KleisliLabs AI Assessment <onboarding@resend.dev>',
      to: data.email,
      bcc: process.env.NOTIFICATION_EMAIL || 'hello@kleislilabs.com', // Also send copy to you
      subject: `Your AI Readiness Report - Score: ${data.score}/10`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6;">Thank you for completing the AI Readiness Assessment!</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3 style="margin: 0 0 10px 0;">Your Score</h3>
            <div style="font-size: 48px; font-weight: bold; color: #3b82f6;">${data.score}/10</div>
            <p style="color: #6b7280; margin: 10px 0 0 0;">${data.level} Level</p>
          </div>
          
          <p>Hi ${data.name || 'there'},</p>
          
          <p>Thank you for taking the time to complete our AI Readiness Assessment. Your personalized report is attached to this email as a PDF.</p>
          
          <p>Based on your score, here's what we recommend:</p>
          
          <ul style="line-height: 1.8; color: #4b5563;">
            ${data.score >= 8 ? 
              `<li>You're ready for advanced AI implementations</li>
               <li>Focus on scaling existing AI initiatives</li>
               <li>Explore cutting-edge AI technologies for competitive advantage</li>` :
              data.score >= 6 ?
              `<li>Start with a pilot AI project in a high-impact area</li>
               <li>Build your data infrastructure and governance</li>
               <li>Develop an AI training program for your team</li>` :
              `<li>Begin with foundational AI education for your team</li>
               <li>Identify and prioritize use cases for AI</li>
               <li>Start collecting and organizing your data assets</li>`
            }
          </ul>
          
          <div style="background: #d1fae5; padding: 20px; border-radius: 10px; margin: 30px 0; text-align: center;">
            <h3 style="margin: 0 0 15px 0;">Ready to take the next step?</h3>
            <p style="margin: 0 0 15px 0;">Let's discuss how AI can transform your business</p>
            <a href="https://cal.com/ipm0b/discovery" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Schedule Your Free Strategy Session
            </a>
          </div>
          
          <p>Have questions? Simply reply to this email, and our AI specialists will be happy to help.</p>
          
          <p>Best regards,<br>
          The KleisliLabs Team</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            KleisliLabs - AI Implementation Partners<br>
            hello@kleislilabs.com | https://kleislilabs.com
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `AI-Readiness-Report-${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBase64,
        }
      ],
    });
    
    console.log('Report email sent:', emailResult);
    
    return NextResponse.json({
      success: true,
      message: 'Report sent successfully',
      emailId: emailResult.data?.id
    });
    
  } catch (error) {
    console.error('Failed to send report:', error);
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    );
  }
}