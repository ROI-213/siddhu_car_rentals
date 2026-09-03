const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The form section starts at <div id="planner-form-section"
content = content.replace(
  '<div id="planner-form-section" style={{ animation: "slideDown 0.5s ease-out" }}>',
  '<div style={{ maxWidth: \'1280px\', margin: \'0 auto\' }}>\n          <div id="planner-form-section" style={{ animation: "slideDown 0.5s ease-out" }}>'
);

// We need to close this new div after planner-form-section closes.
// It currently closes at:
/*
          </div>
          )}

        </div>
        )}
*/
// The first `</div>` closes planner-form-section.
// The first `)}` closes `isFormOpen && (`.
// We can just add the closing `</div>` right after the first `</div>`.
content = content.replace(
  '          </div>\n          )}',
  '          </div>\n          </div>\n          )}'
);


fs.writeFileSync(filePath, content, 'utf8');
console.log('Wrapped form in 1280px container');
