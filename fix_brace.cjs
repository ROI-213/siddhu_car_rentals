const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

content = content.replace(
  /\s*<\/div>\n\n\s*<\/div>\n\n\s*{\/\* ========================================================= \*\//,
  "\n          </div>\n          )}\n\n        </div>\n\n        {/* ========================================================= */"
);

fs.writeFileSync('./src/pages/Home.jsx', content);
console.log("Fixed brace");
