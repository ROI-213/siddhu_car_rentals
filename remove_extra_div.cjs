const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `              </div>
            )}
          </div>
          )}
          </div>
          </div>
          )}

        </div>

        {/* ========================================================= */}`;

const correctStr = `              </div>
            )}
          </div>
          )}
          </div>
          </div>
          )}

        {/* ========================================================= */}`;

content = content.replace(targetStr, correctStr);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed extra div');
