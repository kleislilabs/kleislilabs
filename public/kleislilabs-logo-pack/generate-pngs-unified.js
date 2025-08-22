#!/usr/bin/env node

/**
 * Unified PNG generation script using contract-based configuration
 * Replaces 4 duplicate scripts with a single configurable solution
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration contract
class PNGGeneratorConfig {
  constructor(quality = 'standard') {
    this.quality = quality;
    this.outputDir = path.join(__dirname, 'png', quality === 'standard' ? '' : quality);
    this.conversions = this.getConversions(quality);
  }
  
  getConversions(quality) {
    const baseConfigs = [
      // Full logo PNGs
      { input: 'svg/kleislilabs-logo-full.svg', sizes: [512, 256, 128], aspectRatio: 4.65 },
      // Monogram PNGs
      { input: 'svg/kleislilabs-monogram.svg', sizes: [512, 256, 128], aspectRatio: 1 },
      // Favicon
      { input: 'svg/kleislilabs-monogram.svg', sizes: [32, 16], aspectRatio: 1, prefix: 'favicon' }
    ];
    
    return this.expandConfigs(baseConfigs, quality);
  }
  
  expandConfigs(baseConfigs, quality) {
    const configs = [];
    
    for (const config of baseConfigs) {
      for (const size of config.sizes) {
        const height = Math.round(size / config.aspectRatio);
        const prefix = config.prefix || path.basename(config.input, '.svg');
        const qualitySuffix = quality === 'standard' ? '' : `-${quality}`;
        
        configs.push({
          input: config.input,
          output: `png/${prefix}-${size}${qualitySuffix}.png`,
          width: size,
          height: height,
          quality: this.getQualitySettings(quality)
        });
      }
    }
    
    return configs;
  }
  
  getQualitySettings(quality) {
    const settings = {
      standard: { density: 150, quality: 90 },
      hq: { density: 300, quality: 95 },
      ultra: { density: 600, quality: 100 },
      compressed: { density: 72, quality: 75 }
    };
    
    return settings[quality] || settings.standard;
  }
}

// PNG Generator using configuration contract
class PNGGenerator {
  constructor(config) {
    this.config = config;
  }
  
  async generate() {
    // Create output directory
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }
    
    console.log(`🎨 Generating ${this.config.quality} quality PNGs...`);
    
    const results = await Promise.all(
      this.config.conversions.map(conversion => this.convertSingle(conversion))
    );
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`✅ Generated ${successful} PNGs`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed}`);
    }
  }
  
  convertSingle(conversion) {
    return new Promise((resolve) => {
      const inputPath = path.join(__dirname, conversion.input);
      const outputPath = path.join(__dirname, conversion.output);
      const { density, quality } = conversion.quality;
      
      const command = `convert -background none -density ${density} "${inputPath}" -resize ${conversion.width}x${conversion.height} -quality ${quality} "${outputPath}"`;
      
      exec(command, (error) => {
        if (error) {
          console.error(`Failed to generate ${conversion.output}: ${error.message}`);
          resolve({ success: false, file: conversion.output });
        } else {
          console.log(`✓ Generated ${conversion.output}`);
          resolve({ success: true, file: conversion.output });
        }
      });
    });
  }
}

// Main execution
async function main() {
  const quality = process.argv[2] || 'standard';
  const validQualities = ['standard', 'hq', 'ultra', 'compressed'];
  
  if (!validQualities.includes(quality)) {
    console.error(`Invalid quality: ${quality}`);
    console.log(`Valid options: ${validQualities.join(', ')}`);
    process.exit(1);
  }
  
  const config = new PNGGeneratorConfig(quality);
  const generator = new PNGGenerator(config);
  
  await generator.generate();
}

// Check for ImageMagick
exec('which convert', (error) => {
  if (error) {
    console.error('ImageMagick is not installed. Please install it first:');
    console.error('macOS: brew install imagemagick');
    console.error('Ubuntu: sudo apt-get install imagemagick');
    process.exit(1);
  }
  
  main().catch(console.error);
});