#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔧 Fixing common validation issues...\n');

try {
  // Auto-fix ESLint issues
  console.log('📝 Auto-fixing ESLint issues...');
  execSync('npm run lint:fix', { stdio: 'inherit' });

  // Auto-fix Prettier formatting
  console.log('🎨 Auto-fixing Prettier formatting...');
  execSync('npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,md}"', {
    stdio: 'inherit',
  });

  console.log(
    '✅ Common issues fixed! Run "npm run validate" to check remaining issues.'
  );
} catch (error) {
  console.log('❌ Error fixing issues:', error.message);
  process.exit(1);
}
