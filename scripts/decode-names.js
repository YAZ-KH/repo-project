import { readdirSync } from 'fs';
import { resolve } from 'path';

const extractDir = resolve(process.cwd(), 'extracted', 'stitch_mdhplatform_dashboard_variant_1');

const dirs = readdirSync(extractDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => {
    // Decode Unicode escapes like #U0625
    const decoded = d.name.replace(/#U([0-9A-Fa-f]{4})/g, (_, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    return { original: d.name, decoded };
  });

dirs.forEach((d, i) => {
  console.log(`${i + 1}. ${d.decoded}`);
});
