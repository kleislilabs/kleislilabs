import jsPDF from 'jspdf';

interface ReportData {
  score: number;
  level: string;
  email: string;
  name?: string;
  company?: string;
  completedAt: string;
  categoryScores: Record<string, number>;
  recommendations: Array<{
    title: string;
    description: string;
    priority: string;
  }>;
}

export function generatePDFReport(data: ReportData): Blob {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, options: {
    maxWidth?: number;
    lineHeight?: number;
    align?: 'left' | 'center' | 'right';
  } = {}) => {
    const lines = pdf.splitTextToSize(text, options.maxWidth || contentWidth);
    pdf.text(lines, x, y, options);
    return lines.length * (options.lineHeight || 7);
  };

  // Header with gradient effect (simulated)
  pdf.setFillColor(59, 130, 246); // Primary blue
  pdf.rect(0, 0, pageWidth, 50, 'F');
  
  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.text('AI Readiness Assessment Report', pageWidth / 2, 25, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text(`${data.company || data.email}`, pageWidth / 2, 35, { align: 'center' });
  pdf.text(`${new Date(data.completedAt).toLocaleDateString()}`, pageWidth / 2, 42, { align: 'center' });
  
  yPosition = 65;
  
  // Score Card
  pdf.setTextColor(0, 0, 0);
  pdf.setFillColor(243, 244, 246);
  pdf.roundedRect(margin, yPosition, contentWidth, 45, 5, 5, 'F');
  
  // Score
  pdf.setFontSize(36);
  pdf.setTextColor(59, 130, 246);
  pdf.text(`${data.score}/10`, pageWidth / 2, yPosition + 20, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text(data.level, pageWidth / 2, yPosition + 35, { align: 'center' });
  
  yPosition += 55;
  
  // Score interpretation
  pdf.setFontSize(11);
  pdf.setTextColor(100, 100, 100);
  let interpretation = '';
  if (data.score >= 8) {
    interpretation = "Excellent! Your organization is primed for AI transformation.";
  } else if (data.score >= 6) {
    interpretation = "Great foundation! You're well-positioned to start meaningful AI initiatives.";
  } else if (data.score >= 4) {
    interpretation = "Good start! With targeted improvements, you'll be ready for impactful AI adoption.";
  } else {
    interpretation = "Perfect timing! We'll help you build a solid foundation for successful AI implementation.";
  }
  
  yPosition += addText(interpretation, margin, yPosition, { 
    maxWidth: contentWidth,
    lineHeight: 6
  });
  
  yPosition += 10;
  
  // Category Breakdown
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Category Breakdown', margin, yPosition);
  yPosition += 10;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  Object.entries(data.categoryScores).forEach(([category, score]) => {
    // Category name
    pdf.setTextColor(50, 50, 50);
    pdf.text(category, margin, yPosition);
    
    // Score
    pdf.text(`${score}/10`, pageWidth - margin - 20, yPosition);
    
    // Progress bar
    const barWidth = contentWidth - 60;
    const barHeight = 4;
    pdf.setFillColor(229, 231, 235);
    pdf.rect(margin, yPosition + 2, barWidth, barHeight, 'F');
    
    // Fill based on score
    if (score >= 8) {
      pdf.setFillColor(34, 197, 94);
    } else if (score >= 6) {
      pdf.setFillColor(59, 130, 246);
    } else {
      pdf.setFillColor(251, 146, 60);
    }
    pdf.rect(margin, yPosition + 2, (barWidth * score) / 10, barHeight, 'F');
    
    yPosition += 12;
  });
  
  yPosition += 10;
  
  // Check if we need a new page
  if (yPosition > pageHeight - 100) {
    pdf.addPage();
    yPosition = margin;
  }
  
  // Recommendations
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Key Recommendations', margin, yPosition);
  yPosition += 10;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  data.recommendations.forEach((rec) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = margin;
    }
    
    // Bullet point
    pdf.setFillColor(59, 130, 246);
    pdf.circle(margin + 3, yPosition - 2, 2, 'F');
    
    // Title
    pdf.setFont('helvetica', 'bold');
    pdf.text(rec.title, margin + 10, yPosition);
    
    // Priority badge
    if (rec.priority === 'High') {
      pdf.setTextColor(239, 68, 68);
    } else {
      pdf.setTextColor(107, 114, 128);
    }
    pdf.setFontSize(8);
    pdf.text(`[${rec.priority}]`, pageWidth - margin - 20, yPosition);
    
    yPosition += 6;
    
    // Description
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    yPosition += addText(rec.description, margin + 10, yPosition, {
      maxWidth: contentWidth - 20,
      lineHeight: 5
    });
    
    yPosition += 8;
  });
  
  // Next Steps
  if (yPosition > pageHeight - 80) {
    pdf.addPage();
    yPosition = margin;
  }
  
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Your Next Steps', margin, yPosition);
  yPosition += 10;
  
  const nextSteps = [
    "Book a complimentary strategy session with our AI specialists",
    "Get your personalized AI Implementation Roadmap",
    "Join our exclusive AI Transformation Workshop",
    "Explore real-world AI success stories from our portfolio"
  ];
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  nextSteps.forEach(step => {
    pdf.setFillColor(34, 197, 94);
    pdf.circle(margin + 3, yPosition - 2, 2, 'F');
    pdf.setTextColor(50, 50, 50);
    yPosition += addText(step, margin + 10, yPosition, {
      maxWidth: contentWidth - 20,
      lineHeight: 5
    });
    yPosition += 5;
  });
  
  // CTA Section
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = margin;
  }
  
  yPosition += 15;
  pdf.setFillColor(217, 250, 229);
  pdf.roundedRect(margin, yPosition, contentWidth, 40, 5, 5, 'F');
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text("Ready to Transform Your Business with AI?", pageWidth / 2, yPosition + 15, { align: 'center' });
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text("Schedule your free consultation:", pageWidth / 2, yPosition + 25, { align: 'center' });
  pdf.setTextColor(59, 130, 246);
  pdf.text("https://cal.com/ipm0b/discovery", pageWidth / 2, yPosition + 32, { align: 'center' });
  
  // Footer
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(8);
  pdf.text("© 2025 KleisliLabs | hello@kleislilabs.com", pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  return pdf.output('blob');
}

export function generateHTMLReport(data: ReportData): string {
  const interpretation = data.score >= 8 ? 
    "Excellent! Your organization is primed for AI transformation." :
    data.score >= 6 ? 
    "Great foundation! You're well-positioned to start meaningful AI initiatives." :
    data.score >= 4 ? 
    "Good start! With targeted improvements, you'll be ready for impactful AI adoption." :
    "Perfect timing! We'll help you build a solid foundation for successful AI implementation.";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Readiness Report - ${data.company || 'Your Company'}</title>
      <meta charset="UTF-8">
      <style>
        @page { size: A4; margin: 20mm; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: white;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 40px;
          border-radius: 12px;
          margin-bottom: 30px;
          text-align: center;
        }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { opacity: 0.9; font-size: 14px; }
        .score-card {
          background: #f3f4f6;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          margin: 30px 0;
        }
        .score {
          font-size: 64px;
          font-weight: bold;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .level {
          font-size: 24px;
          color: #4b5563;
          margin-top: 10px;
        }
        .interpretation {
          color: #6b7280;
          margin-top: 15px;
          font-size: 16px;
        }
        .section {
          margin: 40px 0;
        }
        .section-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #1f2937;
        }
        .category-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .category-name {
          font-weight: 500;
          color: #4b5563;
        }
        .progress-bar {
          flex: 1;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          margin: 0 15px;
          position: relative;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .progress-fill.high { background: #22c55e; }
        .progress-fill.medium { background: #3b82f6; }
        .progress-fill.low { background: #fb923c; }
        .recommendation {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
        }
        .recommendation-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 10px;
        }
        .recommendation-title {
          font-weight: 600;
          color: #1f2937;
          font-size: 16px;
        }
        .priority-badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        .priority-high {
          background: #fee2e2;
          color: #dc2626;
        }
        .priority-medium {
          background: #fef3c7;
          color: #d97706;
        }
        .recommendation-description {
          color: #6b7280;
          font-size: 14px;
        }
        .next-steps {
          background: #f0fdf4;
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
        }
        .next-steps ul {
          list-style: none;
          padding: 0;
        }
        .next-steps li {
          padding: 10px 0;
          padding-left: 30px;
          position: relative;
          color: #4b5563;
        }
        .next-steps li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: bold;
        }
        .cta {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          margin: 40px 0;
        }
        .cta h3 {
          font-size: 24px;
          margin-bottom: 15px;
        }
        .cta p {
          margin-bottom: 20px;
          opacity: 0.95;
        }
        .cta-button {
          display: inline-block;
          background: white;
          color: #3b82f6;
          padding: 12px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AI Readiness Assessment Report</h1>
          <p>${data.company || data.email}</p>
          <p>${new Date(data.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div class="score-card">
          <div class="score">${data.score}/10</div>
          <div class="level">${data.level}</div>
          <p class="interpretation">${interpretation}</p>
        </div>
        
        <div class="section">
          <h2 class="section-title">Category Breakdown</h2>
          ${Object.entries(data.categoryScores).map(([category, score]) => `
            <div class="category-item">
              <span class="category-name">${category}</span>
              <div class="progress-bar">
                <div class="progress-fill ${score >= 8 ? 'high' : score >= 6 ? 'medium' : 'low'}" 
                     style="width: ${score * 10}%"></div>
              </div>
              <span style="font-weight: 600; color: #4b5563;">${score}/10</span>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2 class="section-title">Key Recommendations</h2>
          ${data.recommendations.map(rec => `
            <div class="recommendation">
              <div class="recommendation-header">
                <h3 class="recommendation-title">${rec.title}</h3>
                <span class="priority-badge priority-${rec.priority.toLowerCase()}">${rec.priority}</span>
              </div>
              <p class="recommendation-description">${rec.description}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="next-steps">
          <h2 class="section-title">Your Next Steps</h2>
          <ul>
            <li>Book a complimentary strategy session with our AI specialists</li>
            <li>Get your personalized AI Implementation Roadmap</li>
            <li>Join our exclusive AI Transformation Workshop</li>
            <li>Explore real-world AI success stories from our portfolio</li>
          </ul>
        </div>
        
        <div class="cta">
          <h3>Ready to Transform Your Business with AI?</h3>
          <p>Let's build your AI success story together. Schedule your free consultation today.</p>
          <a href="https://cal.com/ipm0b/discovery" class="cta-button">Schedule Discovery Call</a>
        </div>
        
        <div class="footer">
          <p>© 2025 KleisliLabs | hello@kleislilabs.com</p>
          <p class="no-print" style="margin-top: 10px;">
            <a href="javascript:window.print()" style="color: #3b82f6;">Print this report</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}