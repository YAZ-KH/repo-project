import { execSync } from 'child_process';
import { readdirSync, existsSync, copyFileSync } from 'fs';
import { resolve } from 'path';

const zipSource = '/vercel/share/v0-project/stitch_mdhplatform_dashboard_variant_1.zip';
const localZip = '/home/user/stitch_mdhplatform_dashboard_variant_1.zip';
const extractDir = '/home/user/extracted';

// Copy zip to home dir first
console.log('Source ZIP exists:', existsSync(zipSource));
copyFileSync(zipSource, localZip);
console.log('Copied ZIP to home dir');

// Extract
execSync(`unzip -o "${localZip}" -d "${extractDir}"`);
console.log('Extracted successfully!');

// List extracted files
function listFiles(dir, prefix = '') {
  const items = readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const path = `${prefix}${item.name}`;
    if (item.isDirectory()) {
      console.log(`[DIR] ${path}/`);
      listFiles(`${dir}/${item.name}`, `${path}/`);
    } else {
      console.log(`[FILE] ${path}`);
    }
  }
}
listFiles(extractDir);
