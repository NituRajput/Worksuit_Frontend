#!/usr/bin/env node

import { execSync } from 'child_process';
import process from 'process';

console.log('🔍 Running focused validation checks...\n');

const checks = [
  {
    name: 'TypeScript Type Checking',
    command: 'npm run type-check',
    critical: true,
  },
  {
    name: 'Critical ESLint Errors',
    command: 'npx eslint src/ --ext .js,.jsx,.ts,.tsx --quiet --max-warnings 0',
    critical: true,
  },
  {
    name: 'Unused Imports/Variables',
    command:
      'npx eslint src/ --ext .js,.jsx,.ts,.tsx --rule "@typescript-eslint/no-unused-vars: error" --quiet',
    critical: true,
  },
  {
    name: 'Console.log Detection',
    command:
      'npx eslint src/ --ext .js,.jsx,.ts,.tsx --rule "no-console: warn" --quiet',
    critical: false,
  },
];

let hasErrors = false;
let hasWarnings = false;

for (const check of checks) {
  try {
    console.log(`📝 ${check.name}...`);
    execSync(check.command, { stdio: 'pipe' });
    console.log(`✅ ${check.name} passed\n`);
  } catch (error) {
    if (check.critical) {
      console.log(`❌ ${check.name} failed:`);
      console.log(error.stdout?.toString() || error.message);
      hasErrors = true;
    } else {
      console.log(`⚠️  ${check.name} has warnings:`);
      console.log(error.stdout?.toString() || error.message);
      hasWarnings = true;
    }
    console.log('');
  }
}

if (hasErrors) {
  console.log(
    '❌ Validation failed with critical errors. Please fix them before committing.'
  );
  process.exit(1);
} else if (hasWarnings) {
  console.log(
    '⚠️  Validation completed with warnings. Consider addressing them.'
  );
} else {
  console.log('✅ All validation checks passed successfully!');
}
