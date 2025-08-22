#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Logo dimensions and colors based on the HTML/CSS
const LOGO_CONFIG = {
  colors: {
    primaryBlue: '#1e3a8a',
    accentTeal: '#0d9488',
    white: '#ffffff',
    lightTeal: '#14b8a6',
    textGray: '#64748b',
    lightBlue: '#3b82f6'
  },
  dimensions: {
    logoMark: {
      width: 48,
      height: 48
    },
    fullLogo: {
      width: 280,
      height: 60
    },
    monogram: {
      width: 64,
      height: 64,
      borderRadius: 12
    }
  }
};

// Helper function to create arrow path
function createArrowPath(startX, startY, length, rotation = 0, color) {
  const arrowWidth = 4;
  const arrowheadWidth = 12;
  const arrowheadHeight = 6;
  
  // Calculate end point based on rotation
  const rad = (rotation * Math.PI) / 180;
  const endX = startX + length * Math.cos(rad);
  const endY = startY + length * Math.sin(rad);
  
  // Calculate perpendicular direction for arrow width
  const perpRad = rad + Math.PI / 2;
  const halfWidth = arrowWidth / 2;
  
  // Rectangle points
  const rect = {
    x1: startX - halfWidth * Math.cos(perpRad),
    y1: startY - halfWidth * Math.sin(perpRad),
    x2: startX + halfWidth * Math.cos(perpRad),
    y2: startY + halfWidth * Math.sin(perpRad),
    x3: endX + halfWidth * Math.cos(perpRad),
    y3: endY + halfWidth * Math.sin(perpRad),
    x4: endX - halfWidth * Math.cos(perpRad),
    y4: endY - halfWidth * Math.sin(perpRad)
  };
  
  // Arrowhead points
  const arrowTip = {
    x: endX + arrowheadWidth * Math.cos(rad),
    y: endY + arrowheadWidth * Math.sin(rad)
  };
  
  const arrowBase1 = {
    x: endX + arrowheadHeight * Math.cos(perpRad),
    y: endY + arrowheadHeight * Math.sin(perpRad)
  };
  
  const arrowBase2 = {
    x: endX - arrowheadHeight * Math.cos(perpRad),
    y: endY - arrowheadHeight * Math.sin(perpRad)
  };
  
  return `
    <path d="M ${rect.x1} ${rect.y1} 
             L ${rect.x2} ${rect.y2} 
             L ${rect.x3} ${rect.y3} 
             L ${rect.x4} ${rect.y4} Z" 
          fill="${color}" />
    <path d="M ${arrowBase1.x} ${arrowBase1.y} 
             L ${arrowTip.x} ${arrowTip.y} 
             L ${arrowBase2.x} ${arrowBase2.y} Z" 
          fill="${color}" />
  `;
}

// Create the logo mark (K shape with arrows)
function createLogoMark(colors = LOGO_CONFIG.colors) {
  const { primaryBlue, accentTeal } = colors;
  
  // Arrow 1: Horizontal arrow (left side of K)
  const arrow1 = createArrowPath(0, 24, 32, 0, primaryBlue);
  
  // Arrow 2: Upper diagonal arrow
  const arrow2 = createArrowPath(16, 12, 28, 30, accentTeal);
  
  // Arrow 3: Lower diagonal arrow
  const arrow3 = createArrowPath(16, 36, 28, -30, accentTeal);
  
  return `
    <g id="logo-mark">
      ${arrow1}
      ${arrow2}
      ${arrow3}
    </g>
  `;
}

// Create full logo with text
function createFullLogo() {
  const logoMark = createLogoMark();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="280" height="60" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&amp;display=swap');
    </style>
  </defs>
  
  <!-- Logo Mark -->
  <g transform="translate(6, 6)">
    ${logoMark}
  </g>
  
  <!-- Company Name -->
  <text x="70" y="32" 
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="28" 
        font-weight="300" 
        fill="${LOGO_CONFIG.colors.primaryBlue}"
        letter-spacing="-0.5">Kleislilabs</text>
  
  <!-- Tagline -->
  <text x="70" y="48" 
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="12" 
        font-weight="400" 
        fill="${LOGO_CONFIG.colors.textGray}">From Vision to AI Reality</text>
</svg>`;
}

// Create monogram version
function createMonogram() {
  const logoMark = createLogoMark();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="64" height="64" rx="12" fill="${LOGO_CONFIG.colors.primaryBlue}" />
  
  <!-- Logo Mark (white version) -->
  <g transform="translate(8, 8)" opacity="0.9">
    ${createLogoMark({ 
      primaryBlue: LOGO_CONFIG.colors.white,
      accentTeal: LOGO_CONFIG.colors.lightTeal 
    })}
  </g>
</svg>`;
}

// Create white version for dark backgrounds
function createWhiteLogo() {
  const logoMark = createLogoMark({
    primaryBlue: LOGO_CONFIG.colors.lightBlue,
    accentTeal: LOGO_CONFIG.colors.lightTeal
  });
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="280" height="60" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&amp;display=swap');
    </style>
  </defs>
  
  <!-- Logo Mark -->
  <g transform="translate(6, 6)">
    ${logoMark}
  </g>
  
  <!-- Company Name -->
  <text x="70" y="32" 
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="28" 
        font-weight="300" 
        fill="${LOGO_CONFIG.colors.white}"
        letter-spacing="-0.5">Kleislilabs</text>
  
  <!-- Tagline -->
  <text x="70" y="48" 
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="12" 
        font-weight="400" 
        fill="${LOGO_CONFIG.colors.white}"
        opacity="0.8">From Vision to AI Reality</text>
</svg>`;
}

// Main function to generate all SVG files
function generateSVGs() {
  const outputDir = path.join(__dirname, '..', 'public', 'kleislilabs-logo-pack', 'svg');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const svgFiles = [
    { name: 'kleislilabs-logo-full.svg', content: createFullLogo() },
    { name: 'kleislilabs-monogram.svg', content: createMonogram() },
    { name: 'kleislilabs-logo-white.svg', content: createWhiteLogo() }
  ];
  
  // Write all SVG files
  svgFiles.forEach(({ name, content }) => {
    const filePath = path.join(outputDir, name);
    fs.writeFileSync(filePath, content);
    console.log(`Generated: ${name}`);
  });
  
  console.log('\nAll SVG files generated successfully!');
  console.log(`Output directory: ${outputDir}`);
}

// Run the generator
generateSVGs();