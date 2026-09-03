const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the inline style of the grid items
content = content.replace(
  /style=\{\{\s*flex:\s*'0 0 350px',\s*maxWidth:\s*'360px',\s*scrollSnapAlign:\s*'start'\s*\}\}/g,
  'style={{ width: "100%", display: "flex", flexDirection: "column" }}'
);

// 2. Hide the slider navigation arrows
// The div is `<div className="showroom-slider-controls" style={{ display: 'flex', gap: '10px' }}>`
content = content.replace(
  '<div className="showroom-slider-controls" style={{ display: \'flex\', gap: \'10px\' }}>',
  '<div className="showroom-slider-controls" style={{ display: \'none\' }}>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed grid items and hid arrows');
