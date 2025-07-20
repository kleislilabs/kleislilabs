# PNG Generation Scripts

This directory contains scripts to generate PNG files from the SVG logos.

## Prerequisites

Choose one of the following methods:

### Method 1: Using Sharp (Recommended)
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

### Method 2: Using ImageMagick
1. Install ImageMagick:
   - macOS: `brew install imagemagick`
   - Ubuntu/Debian: `sudo apt-get install imagemagick`
   - Windows: Download from https://imagemagick.org/script/download.php

## Usage

### Using Sharp (Recommended):
```bash
npm run generate
# or
node generate-pngs-sharp.js
```

### Using ImageMagick:
```bash
npm run generate-imagemagick
# or
node generate-pngs.js
```

## Output

The scripts will generate the following PNG files in the `png/` directory:

- `kleislilabs-logo-512.png` - High resolution full logo (512x110)
- `kleislilabs-logo-256.png` - Medium resolution full logo (256x55)
- `kleislilabs-logo-128.png` - Small resolution full logo (128x27)
- `kleislilabs-monogram-512.png` - High resolution monogram (512x512)
- `kleislilabs-monogram-256.png` - Medium resolution monogram (256x256)
- `favicon-32.png` - Favicon size (32x32)
- `kleislilabs-logo-white-512.png` - White version high res (512x110)
- `kleislilabs-logo-white-256.png` - White version medium res (256x55)

## Notes

- All PNGs are generated with transparent backgrounds
- The Sharp method is faster and doesn't require external dependencies
- ImageMagick provides more advanced options if needed