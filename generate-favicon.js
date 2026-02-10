const fs = require('fs');
const path = require('path');

// Create a simple ICO file with base64 encoded data
// This is a 32x32 favicon with gradient background and "N" letter
const faviconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#grad)"/>
  <text x="16" y="23" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">N</text>
</svg>
`;

fs.writeFileSync(path.join(__dirname, 'public', 'favicon-32x32.svg'), faviconSVG);
console.log('Favicon created successfully');
