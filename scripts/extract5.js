import { execSync } from 'child_process';

// Find the zip file anywhere on the system
const findResult = execSync('find / -name "*.zip" -type f 2>/dev/null || true').toString().trim();
console.log('Found ZIP files:', findResult);

// List /vercel directory structure
try {
  const vercelLs = execSync('ls -laR /vercel/ 2>/dev/null || echo "no /vercel"').toString();
  console.log('Vercel dir:', vercelLs.substring(0, 3000));
} catch(e) {
  console.log('Cannot access /vercel');
}

// Try various possible paths
const paths = [
  '/vercel/share/v0-project/stitch_mdhplatform_dashboard_variant_1.zip',
  '/home/user/stitch_mdhplatform_dashboard_variant_1.zip',
  './stitch_mdhplatform_dashboard_variant_1.zip',
];

for (const p of paths) {
  try {
    execSync(`test -f "${p}"`, { stdio: 'pipe' });
    console.log(`EXISTS: ${p}`);
  } catch {
    console.log(`NOT FOUND: ${p}`);
  }
}

// Check what's mounted
try {
  const mounts = execSync('mount 2>/dev/null || cat /proc/mounts 2>/dev/null || echo "no mount info"').toString();
  console.log('Mounts:', mounts.substring(0, 2000));
} catch(e) {
  console.log('Cannot check mounts');
}
