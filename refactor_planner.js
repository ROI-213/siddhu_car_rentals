import fs from 'fs';
const homePath = './src/pages/Home.jsx';
let content = fs.readFileSync(homePath, 'utf8');

// We will locate the planner section start and end.
const sectionStart = content.indexOf('<section id="quick-enquiry" className="journey-planner-section">');
// Find where the journey planner section ends, usually before '3. PREMIUM FLEET'
const sectionEnd = content.indexOf('{/* 3. SIDDHU CAR RENTALS — PREMIUM FLEET SHOWCASE */}');
// If not found, let's look for the next major section comment.
let realSectionEnd = sectionEnd !== -1 ? content.lastIndexOf('</section>', sectionEnd) : -1;
if (realSectionEnd === -1) {
    realSectionEnd = content.indexOf('</section>', sectionStart) + '</section>'.length;
}

// We will inject a new CSS import at the top of Home.jsx if not already there
const importInsertionPoint = content.indexOf(`import { CinematicHero }`);
if (!content.includes(`import './JourneyPlannerRefined.css';`)) {
    content = content.substring(0, importInsertionPoint) + `import './JourneyPlannerRefined.css';\n` + content.substring(importInsertionPoint);
}

// Now we need to modify the structure of the journey planner section
// But since the form logic is complex, we will only wrap things and add classes.

let plannerHtml = content.substring(sectionStart, realSectionEnd);

// Wrap header and cards in a container, and add the vehicle image
// Let's replace the intro block and segmented nav with a wrapper
const introStart = plannerHtml.indexOf('<div className="planner-intro-block">');
const navEnd = plannerHtml.indexOf('</div>', plannerHtml.indexOf('</div>', plannerHtml.indexOf('<div className="trip-segmented-nav">')) + 5) + 6; // Rough end of nav, wait, it's safer to use regex or string replacement

plannerHtml = plannerHtml.replace('<div className="planner-intro-block">', `<div className="planner-top-composition">
  <div className="planner-top-left">
    <div className="planner-intro-block">`);

plannerHtml = plannerHtml.replace(/<\/div>\s*\{\/\* 2\. MAIN 4-STAGE JOURNEY WORKSPACE CARD \*\/\}/, 
`</div>
  </div>
  <div className="planner-top-right">
    <img src="/images/fleet/vellfire_front.png" alt="Premium Vehicle" className="planner-hero-vehicle" />
  </div>
</div>
{/* 2. MAIN 4-STAGE JOURNEY WORKSPACE CARD */}`);

// We also need to add the decorative background mountains and sun
plannerHtml = plannerHtml.replace('<div className="planner-ambient-canvas">', 
`<div className="planner-ambient-canvas">
  <div className="planner-landscape-bg"></div>
  <div className="planner-sun"></div>
  <div className="planner-leaves-left"></div>`);

content = content.substring(0, sectionStart) + plannerHtml + content.substring(realSectionEnd);

fs.writeFileSync(homePath, content);
console.log('Journey Planner HTML Refactored');
