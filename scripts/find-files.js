import { execSync } from 'child_process';
import { existsSync } from 'fs';

// Check various possible locations
const locations = [
  '/home/user/extracted',
  '/home/user',
  '/vercel/share/v0-project/extracted',
  '/vercel/share/v0-project',
  '/tmp'
];

for (const loc of locations) {
  if (existsSync(loc)) {
    try {
      const result = execSync(`ls -la "${loc}" 2>/dev/null`).toString();
      console.log(`\n=== ${loc} ===`);
      console.log(result);
    } catch(e) {
      console.log(`Error listing ${loc}:`, e.message);
    }
  }
}

// Find all HTML files anywhere
try {
  const htmlFiles = execSync('find /home/user -name "*.html" -type f 2>/dev/null | head -50').toString();
  console.log('\n=== HTML files found ===');
  console.log(htmlFiles || 'No HTML files found');
} catch(e) {
  console.log('Error finding HTML files');
}

// Find any zip files
try {
  const zipFiles = execSync('find /home/user -name "*.zip" -type f 2>/dev/null').toString();
  console.log('\n=== ZIP files found ===');
  console.log(zipFiles || 'No ZIP files found');
} catch(e) {
  console.log('Error finding ZIP files');
}

// Check if the zip was actually downloaded
try {
  const tmpFiles = execSync('ls -la /tmp/*.zip 2>/dev/null || echo "No zip in tmp"').toString();
  console.log('\n=== /tmp zip files ===');
  console.log(tmpFiles);
} catch(e) {}
