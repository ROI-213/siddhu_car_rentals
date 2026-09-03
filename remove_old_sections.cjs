const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

// 1. Remove Section 2: Journey Planner
const section2Regex = /(?:\s*{\/\*\s*={70,}\s*\*\/}\s*{\/\*\s*2\.\s*SIDDHU CAR RENTALS[\s\S]*?<section id="quick-enquiry" className="journey-planner-section">)[\s\S]*?(?=\s*{\/\*\s*3\.\s*WHY CHOOSE SIDDHU CAR RENTALS)/;
content = content.replace(section2Regex, '\n\n');

// 2. Remove Section 3: Why Choose Us
const section3Regex = /(?:\s*{\/\*\s*3\.\s*WHY CHOOSE SIDDHU CAR RENTALS[\s\S]*?<section className="section-padding" style=\{\{\s*background:\s*'var\(--bg-cream\)',\s*overflow:\s*'hidden'\s*\}\}>)[\s\S]*?(?=\s*<ScrollStory \/>)/;
content = content.replace(section3Regex, '\n\n');

fs.writeFileSync('./src/pages/Home.jsx', content);
console.log('Removed Section 2 and Section 3');
