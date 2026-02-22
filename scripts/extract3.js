import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from 'fs';
import { join } from 'path';

const zipUrl = 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Hnc1EwqILxB/5e70a2aea0b52edafb74b5e3bdca674fca25b5cf2afd437b46ee03612b1895d9.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260222%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260222T221805Z&X-Amz-Expires=3600&X-Amz-Signature=041c6d1891a2092121418a125f00e437baa4cfbccf931457cc713edeb9689c76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject';

const destDir = '/vercel/share/v0-project/extracted';

// Download the zip
console.log('Downloading ZIP file...');
const response = await fetch(zipUrl);
const buffer = Buffer.from(await response.arrayBuffer());
writeFileSync('/home/user/project.zip', buffer);
console.log('Downloaded ZIP file, size:', buffer.length, 'bytes');

// Extract to temp
execSync('rm -rf /home/user/extracted');
execSync('unzip -o /home/user/project.zip -d /home/user/extracted');
console.log('Extracted to /home/user/extracted');

// Now copy all files to /vercel/share/v0-project/extracted/
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
      console.log(`Copied: ${destPath}`);
    }
  }
}

copyRecursive('/home/user/extracted', destDir);
console.log('All files copied to', destDir);
