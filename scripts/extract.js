import { execSync } from 'child_process';
import { readdirSync } from 'fs';

// Extract the zip file
execSync('cd /vercel/share/v0-project && unzip -o stitch_mdhplatform_dashboard_variant_1.zip -d extracted');

// List all extracted files
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

listFiles('/vercel/share/v0-project/extracted');
