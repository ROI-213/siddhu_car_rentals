const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the bento-icon-wrapper
const targetIcon = `                    <div className="bento-overlay">
                      <div className="bento-icon-wrapper">
                        <IconComp size={tab.key === 'Local' ? 24 : 20} />
                      </div>
                      <div className="bento-title">{tab.label}</div>`;

const replacementIcon = `                    <div className="bento-overlay">
                      <div className="bento-title">{tab.label}</div>`;

content = content.replace(targetIcon, replacementIcon);

// 2. Remove the planner-top-right
const targetRight = `    </div>
    <div className="planner-top-right">
      <img src="/images/vellfire_front.png" alt="Premium Vehicle" className="planner-hero-vehicle" />
    </div>
  </div>`;

const replacementRight = `    </div>
  </div>`;

content = content.replace(targetRight, replacementRight);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed icons and planner-top-right');
