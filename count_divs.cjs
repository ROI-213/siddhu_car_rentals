const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let start = lines.findIndex(l => l.includes('{isFormOpen && ('));
let end = lines.findIndex((l, idx) => idx > start && l.includes('{/* ========================================================= */}'));

let divCount = 0;
for(let i = start; i < end; i++) {
  const line = lines[i];
  const openDivs = (line.match(/<div/g) || []).length;
  const closeDivs = (line.match(/<\/div>/g) || []).length;
  divCount += (openDivs - closeDivs);
  if (line.includes(')}')) {
    console.log(`Line ${i}: found ')}', current depth is ${divCount}`);
  }
}
console.log(`Total balance between start and end: ${divCount}`);
