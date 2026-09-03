const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /(onExplore=\{\(\) => onViewVehicleDetail && onViewVehicleDetail\(vehicle\)\}\s*\/>\s*<\/div>\s*\)\)\}\s*<\/div>)/;

const buttonHTML = `
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <button
                onClick={() => window.scrollTo(0, 0)} // If onNavigate is missing, you can use a Link or scrollTo
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
              >
                View All Fleets
              </button>
            </div>`;

// Wait, I see onNavigate is available in Home.jsx props? Let's check Home.jsx top.
// Home = ({ onViewVehicleDetail, onNavigate })
// So I can use onNavigate('fleets')
content = content.replace(regex, `$1\n            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>\n              <button\n                onClick={() => onNavigate && onNavigate('fleets')}\n                style={{\n                  padding: '16px 40px',\n                  background: '#0F172A',\n                  color: '#FFFFFF',\n                  borderRadius: '12px',\n                  fontSize: '1rem',\n                  fontWeight: '700',\n                  border: 'none',\n                  cursor: 'pointer',\n                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)',\n                  transition: 'all 0.3s ease'\n                }}\n                onMouseEnter={e => {\n                  e.currentTarget.style.transform = 'translateY(-2px)';\n                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(15, 23, 42, 0.3)';\n                }}\n                onMouseLeave={e => {\n                  e.currentTarget.style.transform = 'translateY(0)';\n                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.2)';\n                }}\n              >\n                View All Fleets\n              </button>\n            </div>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added button');
