import fs from 'fs';
const homePath = './src/pages/Home.jsx';
let content = fs.readFileSync(homePath, 'utf8');

// Inject import
const importInsertionPoint = content.indexOf(`import { CinematicHero }`);
if (!content.includes(`import { ScrollStory } from '../components/home/ScrollStory';`)) {
    content = content.substring(0, importInsertionPoint) + `import { ScrollStory } from '../components/home/ScrollStory';\n` + content.substring(importInsertionPoint);
}

// Find boundaries
const startTag = '{/* 3. WHY CHOOSE SIDDHU CAR RENTALS';
const endTag = '{/* 4. FEATURED FLEET';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
    // Replace section
    content = content.substring(0, startIndex) +
              `{/* 3. WHY CHOOSE SIDDHU CAR RENTALS (Scroll Storytelling) */}\n      <ScrollStory />\n\n      ` +
              content.substring(endIndex);
    fs.writeFileSync(homePath, content);
    console.log('ScrollStory successfully injected!');
} else {
    console.error('Could not find section boundaries.');
}
