
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function createIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 512 512"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="100" fill="#2563eb"/>
      <circle cx="256" cy="220" r="115" fill="#ffffff" opacity="0.14"/>
      <path d="M145 190 L256 115 L367 190 L367 310 L256 385 L145 310 Z"
            fill="none" stroke="#ffffff" stroke-width="16"
            stroke-linejoin="round"/>
      <text x="256" y="275" font-family="Arial, sans-serif"
            font-size="112" font-weight="bold"
            text-anchor="middle" fill="#ffffff">TG</text>
      <path d="M190 420 L322 420" stroke="#ffffff"
            stroke-width="12" stroke-linecap="round"/>
    </svg>
  `;

  const output = path.join(publicDir, `pwa-${size}x${size}.png`);

  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(output);

  console.log(`Created: ${output}`);
}

async function main() {
  await createIcon(192);
  await createIcon(512);
  console.log("Both TravelGo PWA icons created successfully!");
}

main().catch((error) => {
  console.error("Icon creation failed:", error);
  process.exitCode = 1;
});
