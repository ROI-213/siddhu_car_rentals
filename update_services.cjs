const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'home', 'OurServices.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace("image: '/images/services_airport_new.jpg'", "image: '/images/services_airport_final.jpg'");
content = content.replace("image: '/images/services_local_vellfire.jpg'", "image: '/images/services_local_final.jpg'");
content = content.replace("image: '/images/services_corporate_s_class_landscape.jpg'", "image: '/images/services_corporate_final.jpg'");
content = content.replace("image: '/images/services_outstation_new.jpg'", "image: '/images/services_roundtrip_final.jpg'");
content = content.replace("image: '/images/services_outstation.jpg'", "image: '/images/services_oneway_final.jpg'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated service images');
