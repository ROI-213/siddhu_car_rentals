import fs from 'fs';

const homePath = './src/pages/Home.jsx';
let content = fs.readFileSync(homePath, 'utf8');

if (!content.includes("import './BentoGrid.css';")) {
  content = content.replace("import './JourneyPlannerRefined.css';", "import './JourneyPlannerRefined.css';\nimport './BentoGrid.css';");
}

const bentoHtml = `
          {/* BENTO GRID TRIP TYPE NAVIGATION */}
          <div className="bento-trip-grid">
            {[
              { key: 'Local', label: 'LOCAL', desc: 'City & hourly rental', icon: Car, className: 'bento-local', img: '/images/services_vidhana_soudha.jpg' },
              { key: 'Outstation', label: 'OUTSTATION', desc: 'Intercity getaways', icon: Compass, className: 'bento-outstation', img: '/images/services_outstation_new.jpg' },
              { key: 'Airport Transfer', label: 'AIRPORT', desc: 'Punctual flight pickup', icon: Navigation, className: 'bento-airport', img: '/images/services_airport_new.jpg' },
              { key: 'Corporate', label: 'CORPORATE', desc: 'Executive mobility', icon: Crown, className: 'bento-corporate', img: '/images/services_corporate_new.jpg' },
              { key: 'One Way', label: 'ONE WAY', desc: 'Point-to-point drop', icon: ChevronRight, className: 'bento-oneway', img: '/images/siddhu_white_car_bengaluru_road.jpg' },
              { key: 'Round Trip', label: 'ROUND TRIP', desc: 'Multi-day returns', icon: RotateCw, className: 'bento-roundtrip', img: '/images/chauffeur_service_bengaluru.jpg' }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTripType === tab.key;
              return (
                <div
                  key={tab.key}
                  onClick={() => {
                    handleCategoryChange(tab.key);
                    setTimeout(() => {
                      document.getElementById('planner-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }}
                  className={\`bento-card \${tab.className} \${isActive ? 'active' : ''}\`}
                >
                  <img src={tab.img} alt={tab.label} className="bento-bg-img" />
                  <div className="bento-overlay">
                    <div className="bento-icon-wrapper">
                      <IconComp size={tab.key === 'Local' ? 24 : 20} />
                    </div>
                    <div className="bento-title">{tab.label}</div>
                    <div className="bento-desc">{tab.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div id="planner-form-section">
`;

const segmentedNavStart = content.indexOf('{/* 1. SOPHISTICATED SEGMENTED TRIP TYPE NAVIGATION */}');
const segmentedNavEnd = content.indexOf('</div>', content.indexOf('</button>', segmentedNavStart)) + 6;

// I'll use regex to carefully replace the old segmented nav
content = content.replace(/\{\/\* 1\. SOPHISTICATED SEGMENTED TRIP TYPE NAVIGATION \*\/\}[\s\S]*?(?=<\!\-\- 2\. MAIN 4\-STAGE JOURNEY WORKSPACE CARD \-\->|\{\/\* 2\. MAIN 4-STAGE JOURNEY WORKSPACE CARD \*\/\}|{?\/\* 2\. MAIN 4-STAGE)/, bentoHtml);

// Add the closing div for the planner-form-section wrapper before the next section
const successStateClose = content.indexOf('{/* ========================================================================= */}');
// Actually, I can just wrap the journey-workspace-card.
content = content.replace('{/* 2. MAIN 4-STAGE JOURNEY WORKSPACE CARD */}', '{/* 2. MAIN 4-STAGE JOURNEY WORKSPACE CARD */}');

// The closing div is tricky. Let's just modify the HTML directly.
// The regex above replaced the nav and opened a div.
// We need to close it after `</section>` of quick-enquiry. Wait, no.
// Let's close it right before `</section>` (line 700ish).
content = content.replace('      </section>', '        </div>\n      </section>');

fs.writeFileSync(homePath, content);
console.log('Bento Grid Injected');
