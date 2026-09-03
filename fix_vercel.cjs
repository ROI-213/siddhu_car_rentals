const fs = require('fs');
fs.writeFileSync('vercel.json', JSON.stringify({
  rewrites: [
    {
      source: '/(.*)',
      destination: '/index.html'
    }
  ]
}, null, 2), 'utf8');
console.log('Fixed vercel.json');
