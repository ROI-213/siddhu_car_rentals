const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Fleet.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace "4hrs_40km" with four_hours_forty_km
content = content.replace(/localTariff\["4hrs_40km"\]/g, "localTariff.four_hours_forty_km");

// Replace "8hrs_80km" with eight_hours_eighty_km
content = content.replace(/localTariff\["8hrs_80km"\]/g, "localTariff.eight_hours_eighty_km");

// Replace localTariff.extra_hr with localTariff.extra_hour
content = content.replace(/localTariff\.extra_hr/g, "localTariff.extra_hour");

// Replace localTariff.airport_pickup_drop with localTariff.airport_transfer
content = content.replace(/localTariff\.airport_pickup_drop/g, "localTariff.airport_transfer");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed tariff keys in Fleet.jsx');
