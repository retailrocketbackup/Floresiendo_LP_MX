const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, '../public/images');
const originalsDir = path.join(imagesDir, 'originals');

// Ensure originals directory exists
if (!fs.existsSync(originalsDir)) {
  fs.mkdirSync(originalsDir, { recursive: true });
}

// Images to optimize with their target dimensions
const imagesToOptimize = [
  // Large images (>200KB)
  { file: 'sergio.png', width: 600, quality: 80 },
  { file: 'comunidad-espana-1.jpg', width: 1200, quality: 80 },
  { file: 'retreat-bg.jpg', width: 1920, quality: 75 },
  { file: 'medicinas.png', width: 800, quality: 80 },
  { file: 'rape-dioses.jpg', width: 800, quality: 80 },
  { file: 'rana-mono-gigante.jpg', width: 800, quality: 80 },
  { file: 'floresiendo-logo-banner.png', width: 600, quality: 85 },
  { file: 'circulo-integracion.jpg', width: 800, quality: 80 },
  { file: 'venue-alberca.jpg', width: 1200, quality: 80 },
  { file: 'venue-jardin.jpg', width: 1200, quality: 80 },
  { file: 'grupo-participantes.jpg', width: 1200, quality: 80 },
  // Medium images (100-200KB)
  { file: 'ceremony.jpeg', width: 800, quality: 80 },
  { file: 'comunidad-abrazo-3.jpg', width: 800, quality: 80 },
  { file: 'comunidad-grupo-2.jpg', width: 800, quality: 80 },
  { file: 'sapo-sonora.jpg', width: 800, quality: 80 },
  { file: 'psicoterapia.jpg', width: 800, quality: 80 },
  { file: 'facilitador-guitarra.jpg', width: 800, quality: 80 },
  { file: 'planta-amazonica.jpg', width: 800, quality: 80 },
  { file: 'video-thumbnail-floresiendo-retreat.jpg', width: 800, quality: 80 },
  { file: 'venue-terraza.jpg', width: 1200, quality: 80 },
  { file: 'venue-sala.jpg', width: 1200, quality: 80 },
  { file: 'venue-habitacion-1.jpg', width: 1200, quality: 80 },
  { file: 'comunidad-integracion-4.jpg', width: 800, quality: 80 },
  { file: 'meditacion.jpg', width: 800, quality: 80 },
  { file: 'Roble.jpg', width: 400, quality: 80 },
  { file: 'venue-habitacion-2.jpg', width: 1200, quality: 80 },
  { file: 'comunidad-yoga-6.jpg', width: 800, quality: 80 },
  { file: 'venue-salon-ceremonias.jpg', width: 1200, quality: 80 },
  { file: 'facilitador.jpg', width: 600, quality: 80 },
  { file: 'spiritual-guide-meditation-session.jpg', width: 800, quality: 80 },
  { file: 'comunidad-silueta-5.jpg', width: 800, quality: 80 },
  { file: 'logo-floresiendo.png', width: 200, quality: 85 },
  { file: 'herosectionescuelapage.jpg', width: 1200, quality: 80 },
];

async function optimizeImage(imageConfig) {
  const { file, width, quality } = imageConfig;
  const inputPath = path.join(imagesDir, file);
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const outputPath = path.join(imagesDir, `${baseName}.webp`);
  const backupPath = path.join(originalsDir, `${baseName}_original${ext}`);

  // Check if source file exists
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipped: ${file} (not found)`);
    return;
  }

  // Check if already a webp and skip
  if (ext.toLowerCase() === '.webp') {
    console.log(`⏭️  Skipped: ${file} (already webp)`);
    return;
  }

  try {
    // Backup original if not already backed up
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    // Get original size
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024).toFixed(1);

    // Optimize
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);

    // Get new size
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024).toFixed(1);
    const savings = (((originalStats.size - newStats.size) / originalStats.size) * 100).toFixed(0);

    console.log(`✅ ${file} -> ${baseName}.webp (${originalSize}KB -> ${newSize}KB, -${savings}%)`);
  } catch (err) {
    console.error(`❌ Error optimizing ${file}:`, err.message);
  }
}

async function main() {
  console.log('\n🖼️  Starting image optimization...\n');

  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }

  console.log('\n✨ Done! Remember to update code references to use .webp files.\n');
}

main();
