const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Use regex to remove planner-top-right div and its contents
content = content.replace(/<div className="planner-top-right">[\s\S]*?<\/div>/, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed planner-top-right');
