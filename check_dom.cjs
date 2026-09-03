const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\5697fb6b-fe7c-411f-8ee5-48f9a33d90c1\\.system_generated\\tasks\\task-755.log', 'utf8');
const match = html.indexOf('<section class="car-rental-search-section">');
if (match > -1) {
  console.log(html.substring(match, match + 5000));
}
