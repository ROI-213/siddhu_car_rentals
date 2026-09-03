const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let start = lines.findIndex(l => l.includes('{activeTripType && ('));
let end = lines.findIndex((l, idx) => idx > start && l.includes('{/* STYLES: ADVANCED JOURNEY PLANNER SYSTEM'));

let divCount = 0;
for(let i = start; i < end; i++) {
  const line = lines[i];
  if (!line) continue;
  const openDivs = (line.match(/<div/g) || []).length;
  const closeDivs = (line.match(/<\/div>/g) || []).length;
  divCount += (openDivs - closeDivs);
  
  if (openDivs !== closeDivs) {
     console.log(`[${i}] Depth: ${divCount} | ${line.trim().substring(0, 50)}`);
  }
}
