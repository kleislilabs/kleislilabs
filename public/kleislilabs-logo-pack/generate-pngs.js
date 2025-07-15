#!/usr/bin/env node

const { exec } = require('child_process');
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

// Check if ImageMagick is installed
exec('convert -version', (error, stdout, stderr) => {
  if (error) {
    console.error('ImageMagick is not installed. Please install it first:');
    console.error('macOS: brew install imagemagick');
    console.error('Ubuntu/Debian: sudo apt-get install imagemagick');
    console.error('Windows: Download from https://imagemagick.org/script/download.php');
    process.exit(1);
  }

  console.log('Starting PNG generation...\n');

  // Process each conversion
  conversions.forEach((config, index) => {
    const inputPath = path.join(__dirname, config.input);
    const outputPath = path.join(__dirname, config.output);

    // Create the conversion command
    const command = `convert -background transparent -density 300 "${inputPath}" -resize ${config.width}x${config.height} "${outputPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error generating ${config.output}:`, error.message);
      } else {
        console.log(`✅ Generated ${config.output} (${config.width}x${config.height})`);
      }

      // Check if all conversions are complete
      if (index === conversions.length - 1) {
        console.log('\n✨ PNG generation complete!');
        console.log(`📁 Files saved in: ${outputDir}`);
      }
    });
  });
});