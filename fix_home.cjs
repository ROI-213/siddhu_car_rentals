const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

// 1. Remove old Services section
const servicesRegex = /(?:\s*{\/\*\s*5\.\s*SERVICES\s*\(Asymmetric\s*Showroom\s*Grid\)\s*\*\/})[\s\S]*?(?=\s*{\/\*\s*5\.\s*OUR\s*SERVICES\s*\*\/)/;
content = content.replace(servicesRegex, '\n\n');

// 2. Remove the Journey Overview Itinerary block
const headerRegex = /<div className="summary-board-header">[\s\S]*?<\/div>[\s\S]*?<div className="dynamic-overview-content">[\s\S]*?(?=\{\/\*\s*LIVE\s*SELECTED\s*VEHICLE\s*PREVIEW\s*CARD\s*\*\/})/;
content = content.replace(headerRegex, '');

// 3. Replace images in plannerVehicles and vehicles arrays
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
  content = content.split(oldImg).join(newImg);
}

fs.writeFileSync('./src/pages/Home.jsx', content);
console.log('Fixed Home.jsx');
