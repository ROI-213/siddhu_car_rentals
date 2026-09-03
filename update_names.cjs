const fs = require('fs');
const path = require('path');

const tariffPath = path.join(__dirname, 'src', 'services', 'tariffApi.js');
let content = fs.readFileSync(tariffPath, 'utf8');

// Replace Toyota Vellfire Executive Lounge with Toyota Vellfie
content = content.replace(/'Toyota Vellfire Executive Lounge'/g, "'Toyota Vellfie'");

// Toyato Commuter VIP Lounge -> Toyato Commuter
content = content.replace(/'Toyota Commuter VIP Lounge'/g, "'Toyato Commuter'");

fs.writeFileSync(tariffPath, content, 'utf8');


const pricingPath = path.join(__dirname, 'src', 'services', 'pricingService.js');
let pContent = fs.readFileSync(pricingPath, 'utf8');

pContent = pContent.replace(/"Toyota Vellfire Executive Lounge"/g, '"Toyota Vellfie"');
pContent = pContent.replace(/"Toyota Commuter VIP Lounge"/g, '"Toyato Commuter"');

fs.writeFileSync(pricingPath, pContent, 'utf8');
console.log('Fixed tariff names to match spreadsheet strictly');
