const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The pattern at the end of the form section is:
/*
          </div>
          )}

        </div>

        {/* ========================================================= *}
        {/* STYLES: ADVANCED JOURNEY PLANNER SYSTEM                   *}
*/

const targetStr = `          </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* STYLES: ADVANCED JOURNEY PLANNER SYSTEM                   */}`;

const replacement = `          </div>
          )}

        </div>
        )}

        {/* ========================================================= */}
        {/* STYLES: ADVANCED JOURNEY PLANNER SYSTEM                   */}`;

content = content.replace(targetStr, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Home.jsx isFormOpen closing');
