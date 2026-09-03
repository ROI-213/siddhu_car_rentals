const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change inline style to grid
content = content.replace(
  /className="fleet-scroll-container"[\s\S]*?>/,
  `className="fleet-scroll-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
                paddingBottom: '24px',
                paddingLeft: '4px',
                paddingRight: '4px'
              }}
            >`
);

// 2. Insert .slice(0, 6) before .map
content = content.replace(
  /\.filter\(v => showroomFilter === 'all' \|\| v\.categoryKey === showroomFilter\)\s*\n\s*\.map\(vehicle => \(/,
  ".filter(v => showroomFilter === 'all' || v.categoryKey === showroomFilter)\n                .slice(0, 6)\n                .map(vehicle => ("
);

// 3. Replace .showroom-card-wrapper inline style
content = content.replace(
  /style=\{\{\s*flex:\s*'0 0 350px',\s*maxWidth:\s*'360px',\s*scrollSnapAlign:\s*'start'\s*\}\}/g,
  'style={{ width: "100%", display: "flex", flexDirection: "column" }}'
);

// 4. Add "View All Fleets" button after the grid
const gridEndTarget = `                  </div>
                ))}
            </div>`;
            
const buttonHTML = `                  </div>
                ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <button
                onClick={() => onNavigate && onNavigate('fleets')}
                style={{
                  padding: '16px 40px',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(15, 23, 42, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.2)';
                }}
              >
                View All Fleets
              </button>
            </div>`;

content = content.replace(gridEndTarget, buttonHTML);

// 5. Hide showroom slider controls again just in case
content = content.replace(
  /<div className="showroom-slider-controls" style=\{\{ display: 'flex', gap: '10px' \}\}>/,
  '<div className="showroom-slider-controls" style={{ display: \'none\' }}>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Applied fleet grid 3x3 layout and button');
