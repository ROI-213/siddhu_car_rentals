const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('const [isFormOpen, setIsFormOpen] = useState(false);')) {
  content = content.replace(
    "const [activeTripType, setActiveTripType] = useState(null);",
    "const [activeTripType, setActiveTripType] = useState(null);\n  const [isFormOpen, setIsFormOpen] = useState(false);"
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Home.jsx state');
