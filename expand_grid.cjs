const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'pages', 'JourneyPlannerRefined.css');
let content = fs.readFileSync(cssPath, 'utf8');

// The CSS currently restricts planner-top-left to max-width: 1000px
content = content.replace(
  '  .planner-top-left {\n    width: 100%;\n    max-width: 1000px;\n    margin: 0 auto;\n  }',
  '  .planner-top-left {\n    width: 100%;\n    max-width: 100%;\n    margin: 0 auto;\n  }'
);
content = content.replace(
  '.planner-top-left { width: 100%; max-width: 1000px; margin: 0 auto; }',
  '.planner-top-left { width: 100%; max-width: 100%; margin: 0 auto; }'
);

// Fallback replacement if it's slightly different
content = content.replace(/max-width:\s*1000px;/, 'max-width: 100%;');


fs.writeFileSync(cssPath, content, 'utf8');
console.log('Expanded planner-top-left in CSS');
