import fs from 'fs';
const homePath = './src/pages/Home.jsx';
let content = fs.readFileSync(homePath, 'utf8');

const heroStart = content.indexOf('{/* 1. SIDDHU CAR RENTALS — ELEGANT ADVENTURE HERO SECTION (CINEMATIC TRAVEL) */}');
// find the end of the hero styles
const heroEndString = '/* COMPACT FLOATING JOURNEY PLANNER WIDGET */';
// actually it's easier to find the end of the <style> block of the hero section.
const styleEnd = content.indexOf('</style>', heroStart) + '</style>'.length;

const replacement = `<CinematicHero onExploreFleet={scrollToFleet} onGetQuote={scrollToEnquiry} />`;

content = content.substring(0, heroStart - 85) + replacement + content.substring(styleEnd + 1);

// also need to import CinematicHero at the top
const importInsertionPoint = content.indexOf(`import { GlassCard }`);
content = content.substring(0, importInsertionPoint) + `import { CinematicHero } from '../components/home/CinematicHero';\n` + content.substring(importInsertionPoint);

fs.writeFileSync(homePath, content);
console.log('Replaced Hero section');
