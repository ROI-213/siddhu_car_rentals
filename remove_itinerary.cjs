const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

const headerRegex = /<div className="summary-board-header">[\s\S]*?<\/div>[\s\S]*?<div className="dynamic-overview-content">[\s\S]*?(?=\{\/\*\s*LIVE\s*SELECTED\s*VEHICLE\s*PREVIEW\s*CARD\s*\*\/})/;
content = content.replace(headerRegex, '');

fs.writeFileSync('./src/pages/Home.jsx', content);
console.log('Removed Itinerary Block again');
