const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The `bento-trip-grid` ends right before `{isFormOpen && (`
const targetStr = '          {isFormOpen && (';
const missingTags = `  </div>
  <div className="planner-top-right">
    <img src="/images/vellfire_front.png" alt="Premium Vehicle" className="planner-hero-vehicle" />
  </div>
</div>
`;

content = content.replace(targetStr, missingTags + '\n          ' + targetStr);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Home.jsx tags');
