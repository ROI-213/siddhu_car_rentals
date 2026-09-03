const fs = require('fs');

const oldHome = fs.readFileSync('C:\\Users\\LENOVO\\Downloads\\SIDDHU_temp_extract\\SIDDHU_CAR_RENTALS\\src\\pages\\Home.jsx', 'utf8');
const section2Regex = /(?:\s*{\/\*\s*={70,}\s*\*\/}\s*{\/\*\s*2\.\s*SIDDHU CAR RENTALS[\s\S]*?<section id="quick-enquiry" className="journey-planner-section">)[\s\S]*?(?=\s*{\/\*\s*3\.\s*WHY CHOOSE SIDDHU CAR RENTALS)/;
let oldSection2 = oldHome.match(section2Regex)[0];

// 1. Initial State
let currentHome = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

// Replace the messed up Section 2 in currentHome
currentHome = currentHome.replace(section2Regex, "%%SECTION2%%");

// Now let's carefully modify oldSection2:

// a. Wrap journey-workspace-card
oldSection2 = oldSection2.replace(
  /<div className="journey-workspace-card">/,
  "{activeTripType && (\n            <div className=\"journey-workspace-card\">"
);

// We need to find the `</div>` that closes it.
// It is right before: `</div>\n\n        {/* ===`
// Let's replace:
oldSection2 = oldSection2.replace(
  /(\s*<\/div>\n\n\s*<\/div>\n\n\s*{\/\* =+ \*\/)/,
  "\n            )}\n$1"
);

// Remove the itinerary block from oldSection2
const headerRegex = /<div className="summary-board-header">[\s\S]*?<\/div>[\s\S]*?<div className="dynamic-overview-content">[\s\S]*?(?=\{\/\*\s*LIVE\s*SELECTED\s*VEHICLE\s*PREVIEW\s*CARD\s*\*\/})/;
oldSection2 = oldSection2.replace(headerRegex, '');

// Remove the Outstation tab from oldSection2
oldSection2 = oldSection2.replace(
  /\s*{\s*key:\s*'Outstation',\s*label:\s*'OUTSTATION',\s*desc:\s*'Intercity getaways',\s*icon:\s*Compass,\s*color:\s*'#059669'\s*},/,
  ""
);

// Fix fleet images in oldSection2
const imageMap = {
  '/images/fleet/mercedes_s_class_chauffeur.jpg': '/images/sclass_front.png',
  '/images/fleet/bmw_730ld_front.png': '/images/bmw_front.jpg',
  '/images/fleet/vellfire_front.png': '/images/vellfire_front.jpg',
  '/images/fleet/mercedes_e_class_front.jpg': '/images/eclass_front.jpg',
  '/images/fleet/audi_q7.jpg': '/images/audi_q7_side.png',
  '/images/fleet/honda_accord_front.jpg': '/images/accord_front.jpg',
  '/images/fleet/innova_crysta_bronze_front.jpg': '/images/crysta_front.png',
  '/images/fleet/innova_hycross_front.png': '/images/hycross_front.jpg',
  '/images/fleet/toyota_commuter.jpg': '/images/hiace_front.png',
  '/images/fleet/force_traveller_front.png': '/images/traveller_front.jpg'
};
for (const [oldImg, newImg] of Object.entries(imageMap)) {
  oldSection2 = oldSection2.split(oldImg).join(newImg);
}

// Inject back
currentHome = currentHome.replace("%%SECTION2%%", oldSection2);

fs.writeFileSync('./src/pages/Home.jsx', currentHome);
console.log('Restored correctly');
