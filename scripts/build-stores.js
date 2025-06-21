
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Iniciando build para as lojas...');

// Build do projeto web
console.log('📦 Building web app...');
execSync('npm run build', { stdio: 'inherit' });

// Sync com Capacitor
console.log('🔄 Syncing with Capacitor...');
execSync('npx cap sync', { stdio: 'inherit' });

// Generate icons and splash screens
console.log('🎨 Generating icons and splash screens...');
try {
  execSync('npx capacitor-assets generate', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  capacitor-assets not found, install with: npm install -g @capacitor/assets');
}

// Android build
console.log('🤖 Building Android...');
try {
  execSync('npx cap build android --prod', { stdio: 'inherit' });
  console.log('✅ Android build completed!');
} catch (error) {
  console.log('❌ Android build failed:', error.message);
}

// iOS build (só funciona no macOS)
if (process.platform === 'darwin') {
  console.log('🍎 Building iOS...');
  try {
    execSync('npx cap build ios --prod', { stdio: 'inherit' });
    console.log('✅ iOS build completed!');
  } catch (error) {
    console.log('❌ iOS build failed:', error.message);
  }
} else {
  console.log('🍎 iOS build skipped (requires macOS)');
}

console.log('🎉 Build process completed!');
console.log('📱 Next steps:');
console.log('- Android: Open android/app/build/outputs/apk/ for APK files');
console.log('- iOS: Open ios/build/Build/Products/ for app files');
console.log('- Test on real devices before publishing');
