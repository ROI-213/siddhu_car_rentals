const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace container with a wider custom container for this section
content = content.replace(
  '<div className="container" style={{ position: \'relative\', zIndex: 10 }}>',
  '<div style={{ position: \'relative\', zIndex: 10, width: \'100%\', maxWidth: \'1800px\', margin: \'0 auto\', padding: \'0 20px\' }}>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Expanded container in Home.jsx');
