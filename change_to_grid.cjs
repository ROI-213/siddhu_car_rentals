const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The original inline style:
const originalStyle = `            <div
              ref={fleetSliderRef}
              className="fleet-scroll-container"
              style={{
                display: 'flex',
                gap: '24px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: '24px',
                paddingLeft: '4px',
                paddingRight: '4px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin',
                msOverflowStyle: 'none'
              }}
            >`;

const newStyle = `            <div
              className="fleet-scroll-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                paddingBottom: '24px',
                paddingLeft: '4px',
                paddingRight: '4px'
              }}
            >`;

content = content.replace(originalStyle, newStyle);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced slider with grid layout');
