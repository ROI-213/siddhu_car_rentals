const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Use regex to remove the bento-icon-wrapper div entirely
content = content.replace(/<div className="bento-icon-wrapper">[\s\S]*?<\/div>/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed bento-icon-wrapper');
