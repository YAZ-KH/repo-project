import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const zipPath = '/vercel/share/v0-project/stitch_mdhplatform_dashboard_variant_1.zip';
const destDir = '/vercel/share/v0-project/extracted';

console.log('ZIP exists at v0-project:', existsSync(zipPath));

// Copy the zip to working dir first
const zipContent = readFileSync(zipPath);
writeFileSync('/home/user/project.zip', zipContent);
console.log('Copied ZIP to /home/user/project.zip, size:', zipContent.length);

// Extract
execSync('rm -rf /home/user/extracted');
execSync('unzip -o /home/user/project.zip -d /home/user/extracted');

// List what was extracted
const listAll = execSync('find /home/user/extracted -type f | head -100').toString();
console.log('Extracted files:\n', listAll);

// Copy all files to v0-project
function copyRecursive(src, dest) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  const items = readdirSync(src, { withFileTypes: true });
  for (const item of items) {
    const srcPath = join(src, item.name);
    const destPath = join(dest, item.name);
    if (item.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      const content = readFileSync(srcPath);
      writeFileSync(destPath, content);
    }
  }
}

copyRecursive('/home/user/extracted', destDir);

// List what's in dest
const destFiles = execSync(`find ${destDir} -type f | head -100`).toString();
console.log('Files in dest:\n', destFiles);
console.log('Done!');
