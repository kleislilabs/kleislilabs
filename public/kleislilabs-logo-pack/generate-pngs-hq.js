#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Create output directory
const outputDir = path.join(__dirname, 'png-hq');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// High-quality configurations optimized for powerful systems
const conversions = [
  // Ultra-high resolution full logos (4x scaling)
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-hq/kleislilabs-logo-2048.png',
    width: 2048,
    height: 440,
    density: 600
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-hq/kleislilabs-logo-1024.png',
    width: 1024,
    height: 220,
    density: 600
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-hq/kleislilabs-logo-512.png',
    width: 512,
    height: 110,
    density: 600
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-hq/kleislilabs-logo-256.png',
    width: 256,
    height: 55,
    density: 600
  },
  
  // Ultra-high resolution monograms
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-hq/kleislilabs-monogram-2048.png',
    width: 2048,
    height: 2048,
    density: 600
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-hq/kleislilabs-monogram-1024.png',
    width: 1024,
    height: 1024,
    density: 600
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-hq/kleislilabs-monogram-512.png',
    width: 512,
    height: 512,
    density: 600
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-hq/kleislilabs-monogram-256.png',
    width: 256,
    height: 256,
    density: 600
  },
  
  // High-quality favicons
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-hq/favicon-64.png',
    width: 64,
    height: 64,
    density: 600
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-hq/favicon-32.png',
    width: 32,
    height: 32,
    density: 600
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-hq/favicon-16.png',
    width: 16,
    height: 16,
    density: 600
  },
  
  // White versions for dark backgrounds
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-hq/kleislilabs-logo-white-2048.png',
    width: 2048,
    height: 440,
    density: 600
  },
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-hq/kleislilabs-logo-white-1024.png',
    width: 1024,
    height: 220,
    density: 600
  },
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-hq/kleislilabs-logo-white-512.png',
    width: 512,
    height: 110,
    density: 600
  },
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-hq/kleislilabs-logo-white-256.png',
    width: 256,
    height: 55,
    density: 600
  }
];

async function generateHighQualityPNGs() {
  console.log('🚀 Starting HIGH-QUALITY PNG generation...\n');
  console.log('⚡ Optimized for powerful systems with:');
  console.log('   • 600 DPI rendering density');
  console.log('   • Lanczos resampling for ultra-sharp edges');
  console.log('   • Maximum compression with quality preservation');
  console.log('   • 8-bit color depth optimization\n');

  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;

  for (const config of conversions) {
    const inputPath = path.join(__dirname, config.input);
    const outputPath = path.join(__dirname, config.output);

    try {
      await sharp(inputPath, {
        density: config.density
      })
        .resize(config.width, config.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: 'lanczos3',
          withoutEnlargement: false
        })
        .png({
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: false,
          quality: 100,
          progressive: false
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      
      console.log(`✅ ${config.output} (${config.width}x${config.height}) - ${sizeKB}KB`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error generating ${config.output}:`, error.message);
      errorCount++;
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`\n🎉 HIGH-QUALITY PNG generation complete!`);
  console.log(`📊 Results: ${successCount} successful, ${errorCount} errors`);
  console.log(`⏱️  Total time: ${duration}s`);
  console.log(`📁 Files saved in: ${outputDir}`);
  console.log(`\n💡 Tips for best results:`);
  console.log(`   • Use 2048px versions for print materials`);
  console.log(`   • Use 1024px versions for high-DPI displays`);
  console.log(`   • Use 512px versions for standard web use`);
  console.log(`   • Use 256px versions for thumbnails/previews`);
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  generateHighQualityPNGs();
} catch (error) {
  console.error('❌ Sharp is not installed. Please install it first:');
  console.error('Run: npm install sharp');
}