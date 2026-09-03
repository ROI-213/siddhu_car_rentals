const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

// 1. Change initial state of activeTripType
content = content.replace(
  "const [activeTripType, setActiveTripType] = useState('Local');",
  "const [activeTripType, setActiveTripType] = useState(null);"
);

// 2. Remove the Outstation tab
content = content.replace(
  /\s*{\s*key:\s*'Outstation',\s*label:\s*'OUTSTATION',\s*desc:\s*'Intercity getaways',\s*icon:\s*Compass,\s*color:\s*'#059669'\s*},/,
  ""
);

// 3. Wrap journey-workspace-card
// We find `<div className="journey-workspace-card">`
content = content.replace(
  /<div className="journey-workspace-card">/,
  "{activeTripType && (\n            <div className=\"journey-workspace-card\">"
);

// We find the styles comment to close the brace
content = content.replace(
  /(\s*{\/\* ={57} \*\/\s*{\/\* STYLES: ADVANCED JOURNEY PLANNER SYSTEM)/,
  "\n            )}\n$1"
);

fs.writeFileSync('./src/pages/Home.jsx', content);
console.log('Journey Planner updated');
