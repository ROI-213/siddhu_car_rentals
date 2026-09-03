const fs = require('fs');
let text = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const oldCode = text.substring(
  text.indexOf('<div className="planner-intro-block">'),
  text.indexOf('{/* 2. MAIN 4-STAGE JOURNEY WORKSPACE CARD */}')
);

const newCode = \
          <div className="planner-top-composition">
  <div className="planner-top-left">
    <div className="planner-intro-block">
            <div className="planner-brand-badge">
              <Compass size={14} className="planner-badge-icon" />
              <span>SIDDHU JOURNEY PLANNER</span>
            </div>
            <h2 className="planner-main-title">
              Where will your journey take you?
            </h2>
            <p className="planner-subtext">
              Select your travel style, personalize your route, and experience seamless, chauffeur-driven mobility.
            </p>
          </div>

          {/* 1. SOPHISTICATED SEGMENTED TRIP TYPE NAVIGATION */}
          <div className="trip-segmented-nav">
            {[
              { key: 'Local', label: 'LOCAL', desc: 'City & hourly rental', icon: Car, color: '#0284C7' },
              { key: 'Airport Transfer', label: 'AIRPORT', desc: 'Punctual flight pickup', icon: Navigation, color: '#0284C7' },
              { key: 'Corporate', label: 'CORPORATE', desc: 'Executive mobility', icon: Crown, color: '#7C3AED' },
              { key: 'One Way', label: 'ONE WAY', desc: 'Point-to-point drop', icon: ChevronRight, color: '#EA580C' },
              { key: 'Round Trip', label: 'ROUND TRIP', desc: 'Multi-day returns', icon: RotateCw, color: '#059669' }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTripType === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleCategoryChange(tab.key)}
                  className={\	rip-segment-card \\}
                >
                  <div className="segment-icon-wrap" style={{ color: isActive ? '#FFFFFF' : tab.color }}>
                    <IconComp size={16} />
                  </div>
                  <div className="segment-text-wrap">
                    <span className="segment-title">{tab.label}</span>
                    <span className="segment-desc">{tab.desc}</span>
                  </div>
                  {isActive && <div className="segment-active-pill" style={{ background: tab.color }}></div>}
                </button>
              );
            })}
          </div>
  </div>
  <div className="planner-top-right">
    <img src="/images/vellfire_front.png" alt="Premium Vehicle" className="planner-hero-vehicle" />
  </div>
</div>
\;

text = text.replace(oldCode, newCode);
fs.writeFileSync('src/pages/Home.jsx', text);
console.log('Restored layout');
