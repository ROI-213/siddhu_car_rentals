import fs from 'fs';

const homePath = './src/pages/Home.jsx';
let content = fs.readFileSync(homePath, 'utf8');

// 1. Add state isFormOpen
if (!content.includes('const [isFormOpen, setIsFormOpen] = useState(false);')) {
  content = content.replace(
    "const [activeTripType, setActiveTripType] = useState('Local');",
    "const [activeTripType, setActiveTripType] = useState('Local');\n  const [isFormOpen, setIsFormOpen] = useState(false);"
  );
}

// 2. Update Bento grid with new images and click handler
content = content.replace(
  /img: '\/images\/services_vidhana_soudha.jpg'/g,
  "img: '/images/bento_local_1788342319392.jpg'"
);
content = content.replace(
  /img: '\/images\/services_outstation_new.jpg'/g,
  "img: '/images/bento_outstation_1788342352892.jpg'"
);
content = content.replace(
  /img: '\/images\/services_airport_new.jpg'/g,
  "img: '/images/bento_airport_1788342392328.jpg'"
);
content = content.replace(
  /img: '\/images\/services_corporate_new.jpg'/g,
  "img: '/images/bento_corporate_1788342425121.jpg'"
);
content = content.replace(
  /img: '\/images\/siddhu_white_car_bengaluru_road.jpg'/g,
  "img: '/images/bento_oneway_1788342573486.jpg'"
);
content = content.replace(
  /img: '\/images\/chauffeur_service_bengaluru.jpg'/g,
  "img: '/images/bento_roundtrip_1788342622281.jpg'"
);

// 3. Update onClick to setIsFormOpen
content = content.replace(
  "handleCategoryChange(tab.key);",
  "handleCategoryChange(tab.key);\n                    setIsFormOpen(true);"
);

// 4. Wrap the form in conditional rendering
// Find the exact line: `<div id="planner-form-section">`
content = content.replace(
  '<div id="planner-form-section">',
  '{isFormOpen && (\n          <div id="planner-form-section" style={{ animation: "slideDown 0.5s ease-out" }}>'
);

// Find the closing div we added in the previous script.
// It's just before `</section>` of quick-enquiry section.
// So let's look for:
// `        </div>`
// `      </section>`
// `      {/* 3. WHY CHOOSE SIDDHU CAR RENTALS`
const sectionEndRegex = /        <\/div>\n      <\/section>\n      \{\/\* 3\. WHY CHOOSE/g;
content = content.replace(sectionEndRegex, '        </div>\n          )}\n      </section>\n      {/* 3. WHY CHOOSE');

fs.writeFileSync(homePath, content);
console.log('Home.jsx updated with form conditional and new images.');
