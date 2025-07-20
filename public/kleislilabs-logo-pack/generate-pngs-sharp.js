#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'png');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Logo generation configurations
const conversions = [
  // Full logo PNGs
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png/kleislilabs-logo-512.png',
    width: 512,
    height: 110
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png/kleislilabs-logo-256.png',
    width: 256,
    height: 55
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png/kleislilabs-logo-128.png',
    width: 128,
    height: 27
  },
  // Monogram PNGs
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png/kleislilabs-monogram-512.png',
    width: 512,
    height: 512
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png/kleislilabs-monogram-256.png',
    width: 256,
    height: 256
  },
  // Favicon
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png/favicon-32.png',
    width: 32,
    height: 32
  },
  // White versions for dark backgrounds
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png/kleislilabs-logo-white-512.png',
    width: 512,
    height: 110
  },
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png/kleislilabs-logo-white-256.png',
    width: 256,
    height: 55
  }
];

async function generatePNGs() {
  console.log('Starting PNG generation using Sharp...\n');

  for (const config of conversions) {
    const inputPath = path.join(__dirname, config.input);
    const outputPath = path.join(__dirname, config.output);

    try {
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: 'nearest'
        })
        .png({
          palette: true,
          compressionLevel: 9,
          adaptiveFiltering: false
        })
        .toFile(outputPath);

      console.log(`✅ Generated ${config.output} (${config.width}x${config.height})`);
    } catch (error) {
      console.error(`❌ Error generating ${config.output}:`, error.message);
    }
  }

  console.log('\n✨ PNG generation complete!');
  console.log(`📁 Files saved in: ${outputDir}`);
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  generatePNGs();
} catch (error) {
  console.error('Sharp is not installed. Please install it first:');
  console.error('Run: npm install sharp');
  console.error('\nAlternatively, you can use the ImageMagick version: node generate-pngs.js');
}