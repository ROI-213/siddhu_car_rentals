const fs = require('fs');
const oldHome = fs.readFileSync('C:\\Users\\LENOVO\\Downloads\\SIDDHU_temp_extract\\SIDDHU_CAR_RENTALS\\src\\pages\\Home.jsx', 'utf8');
const section2Regex = /(?:\s*{\/\*\s*={70,}\s*\*\/}\s*{\/\*\s*2\.\s*SIDDHU CAR RENTALS[\s\S]*?<section id="quick-enquiry" className="journey-planner-section">)[\s\S]*?(?=\s*{\/\*\s*3\.\s*WHY CHOOSE SIDDHU CAR RENTALS)/;
const match = oldHome.match(section2Regex);

if (match) {
    let currentHome = fs.readFileSync('./src/pages/Home.jsx', 'utf8');
    
    // Inject Section 2 back in below CarRentalSearch
    currentHome = currentHome.replace(/(<CarRentalSearch \/>)/, "$1\n\n" + match[0]);
    
    // Add CSS imports if missing
    if (!currentHome.includes('JourneyPlannerRefined.css')) {
        currentHome = currentHome.replace("import { CinematicHero }", "import './JourneyPlannerRefined.css';\nimport './BentoGrid.css';\nimport { CinematicHero }");
    }
    
    fs.writeFileSync('./src/pages/Home.jsx', currentHome);
    console.log('Restored Section 2');
} else {
    console.log('Regex failed to find Section 2');
}
