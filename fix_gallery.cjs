const fs = require('fs');
let text = fs.readFileSync('src/pages/Home.jsx', 'utf8');

text = text.replace(
  /gallery:\s*\[[\s\S]*?mercedes_s_class_interior\.jpg'\s*\]/g,
  "gallery: [ '/images/sclass_front.png', '/images/sclass_chauffeur.png', '/images/sclass_interior.jpg', '/images/sclass_rear.png' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?bmw_730ld_rear\.png'\s*\]/g,
  "gallery: [ '/images/bmw_front.jpg', '/images/bmw_side.png', '/images/bmw_int_front.png', '/images/bmw_int_rear.png', '/images/bmw_rear.png' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?vellfire_rear\.png'\s*\]/g,
  "gallery: [ '/images/vellfire_front.jpg', '/images/vellfire_side.png', '/images/vellfire_int_front.png', '/images/vellfire_int_rear.png', '/images/vellfire_rear.jpg' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?mercedes_e_class_wedding\.jpg'\s*\]/g,
  "gallery: [ '/images/eclass_front.jpg', '/images/eclass_dash.png', '/images/eclass_front_seats.png', '/images/eclass_rear_seats.png' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?audi_q7_rear_seats\.png'\s*\]/g,
  "gallery: [ '/images/audi_q7_side.png', '/images/audi_q7_front_seats.png', '/images/audi_q7_rear_seats_1.png', '/images/audi_q7_rear_seats_2.png' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?honda_accord_interior_rear\.jpg'\s*\]/g,
  "gallery: [ '/images/accord_front.jpg', '/images/accord_front_seats.jpg', '/images/accord_rear_seats.jpg' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?innova_crysta_luxury\.jpg'\s*\]/g,
  "gallery: [ '/images/crysta_front.png', '/images/crysta_side.png', '/images/crysta_rear.png' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?innova_hycross_rear\.png'\s*\]/g,
  "gallery: [ '/images/hycross_front.jpg', '/images/hycross_side.png', '/images/hycross_back.png' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?toyota_commuter_roof_lighting\.jpg'\s*\]/g,
  "gallery: [ '/images/hiace_front.png', '/images/hiace_door_open.png', '/images/hiace_int_1.jpg', '/images/hiace_int_2.jpg', '/images/hiace_int_3.jpg' ]"
);

text = text.replace(
  /gallery:\s*\[[\s\S]*?force_traveller_rear\.png'\s*\]/g,
  "gallery: [ '/images/traveller_front.jpg', '/images/traveller_int_1.jpg', '/images/traveller_int_2.jpg', '/images/traveller_int_3.jpg', '/images/traveller_rear.jpg' ]"
);

fs.writeFileSync('src/pages/Home.jsx', text);
console.log('Fixed galleries');
