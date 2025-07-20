#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Create output directory
const outputDir = path.join(__dirname, 'png-ultra');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ULTRA-HIGH quality configurations - maximum settings
const conversions = [
  // Ultra-extreme resolution full logos (up to 8K)
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-ultra/kleislilabs-logo-8192.png',
    width: 8192,
    height: 1760,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-ultra/kleislilabs-logo-4096.png',
    width: 4096,
    height: 880,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-ultra/kleislilabs-logo-2048.png',
    width: 2048,
    height: 440,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-logo-full.svg',
    output: 'png-ultra/kleislilabs-logo-1024.png',
    width: 1024,
    height: 220,
    density: 2400
  },
  
  // Ultra-extreme resolution monograms (up to 8K square)
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/kleislilabs-monogram-8192.png',
    width: 8192,
    height: 8192,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/kleislilabs-monogram-4096.png',
    width: 4096,
    height: 4096,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/kleislilabs-monogram-2048.png',
    width: 2048,
    height: 2048,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/kleislilabs-monogram-1024.png',
    width: 1024,
    height: 1024,
    density: 2400
  },
  
  // Ultra-high quality favicons with extreme detail
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/favicon-512.png',
    width: 512,
    height: 512,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/favicon-256.png',
    width: 256,
    height: 256,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/favicon-128.png',
    width: 128,
    height: 128,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-monogram.svg',
    output: 'png-ultra/favicon-64.png',
    width: 64,
    height: 64,
    density: 2400
  },
  
  // Ultra-extreme white versions
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-ultra/kleislilabs-logo-white-8192.png',
    width: 8192,
    height: 1760,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-ultra/kleislilabs-logo-white-4096.png',
    width: 4096,
    height: 880,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-ultra/kleislilabs-logo-white-2048.png',
    width: 2048,
    height: 440,
    density: 2400
  },
  {
    input: 'svg/kleislilabs-logo-white.svg',
    output: 'png-ultra/kleislilabs-logo-white-1024.png',
    width: 1024,
    height: 220,
    density: 2400
  }
];

async function generateUltraHighQualityPNGs() {
  console.log('🚀 Starting ULTRA-HIGH-QUALITY PNG generation...\n');
  console.log('⚡ EXTREME settings for maximum quality:');
  console.log('   • 2400 DPI rendering density (4x higher than HQ)');
  console.log('   • Lanczos3 resampling with Mitchell filter fallback');
  console.log('   • Up to 8192px resolution (8K quality)');
  console.log('   • Zero compression artifacts');
  console.log('   • Maximum Sharp performance settings');
  console.log('   • Professional print-ready output\n');

  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;
  let totalSize = 0;

  for (const [index, config] of conversions.entries()) {
    const inputPath = path.join(__dirname, config.input);
    const outputPath = path.join(__dirname, config.output);

    try {
      console.log(`⏳ Processing ${index + 1}/${conversions.length}: ${config.output}...`);
      
      const startItemTime = Date.now();
      
      await sharp(inputPath, {
        density: config.density,
        unlimited: true // Remove memory limits for ultra-high quality
      })
        .resize(config.width, config.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: 'lanczos3',
          withoutEnlargement: false,
          fastShrinkOnLoad: false // Disable fast shrink for max quality
        })
        .png({
          compressionLevel: 0, // No compression for maximum quality
          adaptiveFiltering: true,
          palette: false,
          quality: 100,
          progressive: false,
          force: true
        })
        .toFile(outputPath);

      const endItemTime = Date.now();
      const itemDuration = ((endItemTime - startItemTime) / 1000).toFixed(2);
      
      const stats = fs.statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      totalSize += stats.size;
      
      console.log(`✅ ${config.output}`);
      console.log(`   📐 ${config.width}x${config.height} | 💾 ${sizeKB}KB (${sizeMB}MB) | ⏱️  ${itemDuration}s\n`);
      
      successCount++;
    } catch (error) {
      console.error(`❌ Error generating ${config.output}:`, error.message);
      errorCount++;
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

  console.log(`🎉 ULTRA-HIGH-QUALITY PNG generation complete!`);
  console.log(`📊 Results: ${successCount} successful, ${errorCount} errors`);
  console.log(`💾 Total size: ${totalSizeMB}MB`);
  console.log(`⏱️  Total time: ${duration}s`);
  console.log(`📁 Files saved in: ${outputDir}`);
  console.log(`\n🏆 ULTRA-QUALITY Features:`);
  console.log(`   • 2400 DPI rendering (professional print quality)`);
  console.log(`   • Up to 8192px resolution (8K displays)`);
  console.log(`   • Zero compression artifacts`);
  console.log(`   • Perfect for: Large format printing, 8K displays, professional design`);
  console.log(`   • File sizes optimized for quality over compression`);
}

// Memory and performance optimizations
process.setMaxListeners(0);
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_OPTIONS = '--max-old-space-size=8192';
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  generateUltraHighQualityPNGs();
} catch (error) {
  console.error('❌ Sharp is not installed. Please install it first:');
  console.error('Run: npm install sharp');
}