const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

const regex = /<div className="summary-guarantees-list">[\s\S]*?<span>Transparent billing with zero surprise surcharges<\/span>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*{\/\*/;

content = content.replace(
    regex,
    '<div className="summary-guarantees-list">\n                      <div className="guarantee-line">\n                        <Check size={13} className="g-check" />\n                        <span>Free flexible cancellation up to 4 hours before pickup</span>\n                      </div>\n                      <div className="guarantee-line">\n                        <Check size={13} className="g-check" />\n                        <span>24/7 dedicated dispatch & live tracking assistance</span>\n                      </div>\n                      <div className="guarantee-line">\n                        <Check size={13} className="g-check" />\n                        <span>Transparent billing with zero surprise surcharges</span>\n                      </div>\n                    </div>\n\n                  </div>\n                </div>\n\n              </div>\n            )}\n\n          </div>\n          )}\n\n        </div>\n\n        {/*'
);

fs.writeFileSync('./src/pages/Home.jsx', content);
console.log("Replaced");
