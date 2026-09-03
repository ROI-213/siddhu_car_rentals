const fs = require('fs');
const restored = fs.readFileSync('restored_array.js', 'utf8');
const home = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const match = home.match(/\{\\[\\s*\\{(\\s*.**?)id: \\'mercedes-w-class\\'[\\s\\S]*?\\}\\s\\]\n*              \\.filter(/m);
if (match) {console.log('Found it');}
