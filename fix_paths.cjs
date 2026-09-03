const fs = require('fs');
let text = fs.readFileSync('src/pages/Home.jsx', 'utf8');

text = text.replace(
  /\/images\/fleet\/mercedes_s_class_front\.jpg/g, '/images/sclass_chauffeur.png'
).replace(
  /\/images\/fleet\/mercedes_s_class_rear\.jpg/g, '/images/sclass_rear.png'
).replace(
  /\/images\/fleet\/mercedes_s_class_interior\.jpg/g, '/images/sclass_interior.jpg'
).replace(
  /\/images\/fleet\/mercedes_s_class_chauffeur\.jpg/g, '/images/sclass_front.png'
).replace(
  /\/images\/fleet\/bmw_730ld_front_quarter\.png/g, '/images/bmw_side.png'
).replace(
  /\/images\/fleet\/bmw_730ld_interior_front\.png/g, '/images/bmw_int_front.png'
).replace(
  /\/images\/fleet\/bmw_730ld_interior_rear\.png/g, '/images/bmw_int_rear.png'
).replace(
  /\/images\/fleet\/bmw_730ld_rear\.png/g, '/images/bmw_rear.png'
).replace(
  /\/images\/fleet\/bmw_730ld_front\.png/g, '/images/bmw_front.jpg'
).replace(
  /\/images\/fleet\/vellfire_front_quarter\.png/g, '/images/vellfire_side.png'
).replace(
  /\/images\/fleet\/vellfire_interior_front\.png/g, '/images/vellfire_int_front.png'
).replace(
  /\/images\/fleet\/vellfire_interior_rear\.png/g, '/images/vellfire_int_rear.png'
).replace(
  /\/images\/fleet\/vellfire_rear\.png/g, '/images/vellfire_rear.jpg'
).replace(
  /\/images\/fleet\/vellfire_front\.png/g, '/images/vellfire_front.jpg'
).replace(
  /\/images\/fleet\/mercedes_e_class_cockpit\.png/g, '/images/eclass_dash.png'
).replace(
  /\/images\/fleet\/mercedes_e_class_rear_cabin\.png/g, '/images/eclass_rear_seats.png'
).replace(
  /\/images\/fleet\/mercedes_e_class_front_cabin\.png/g, '/images/eclass_front_seats.png'
).replace(
  /\/images\/fleet\/mercedes_e_class_wedding\.jpg/g, '/images/eclass_rear_seats.png'
).replace(
  /\/images\/fleet\/mercedes_e_class_front\.jpg/g, '/images/eclass_front.jpg'
).replace(
  /\/images\/fleet\/audi_q7_interior\.png/g, '/images/audi_q7_rear_seats_1.png'
).replace(
  /\/images\/fleet\/audi_q7_cockpit\.png/g, '/images/audi_q7_front_seats.png'
).replace(
  /\/images\/fleet\/audi_q7_rear_seats\.png/g, '/images/audi_q7_rear_seats_2.png'
).replace(
  /\/images\/fleet\/audi_q7\.jpg/g, '/images/audi_q7_side.png'
).replace(
  /\/images\/fleet\/honda_accord_interior_front\.jpg/g, '/images/accord_front_seats.jpg'
).replace(
  /\/images\/fleet\/honda_accord_interior_rear\.jpg/g, '/images/accord_rear_seats.jpg'
).replace(
  /\/images\/fleet\/honda_accord_front\.jpg/g, '/images/accord_front.jpg'
).replace(
  /\/images\/fleet\/innova_crysta_bronze_side\.png/g, '/images/crysta_side.png'
).replace(
  /\/images\/fleet\/innova_crysta_bronze_rear\.png/g, '/images/crysta_rear.png'
).replace(
  /\/images\/fleet\/innova_crysta_bronze_front\.jpg/g, '/images/crysta_front.png'
).replace(
  /\/images\/fleet\/innova_hycross_side\.png/g, '/images/hycross_side.png'
).replace(
  /\/images\/fleet\/innova_hycross_rear\.png/g, '/images/hycross_back.png'
).replace(
  /\/images\/fleet\/innova_hycross_front\.png/g, '/images/hycross_front.jpg'
).replace(
  /\/images\/fleet\/toyota_commuter_side\.jpg/g, '/images/hiace_door_open.png'
).replace(
  /\/images\/fleet\/toyota_commuter_interior_tv\.jpg/g, '/images/hiace_int_1.jpg'
).replace(
  /\/images\/fleet\/toyota_commuter_cabin_lounge\.jpg/g, '/images/hiace_int_2.jpg'
).replace(
  /\/images\/fleet\/toyota_commuter_roof_lighting\.jpg/g, '/images/hiace_int_3.jpg'
).replace(
  /\/images\/fleet\/toyota_commuter\.jpg/g, '/images/hiace_front.png'
).replace(
  /\/images\/fleet\/force_traveller_interior_seats\.jpg/g, '/images/traveller_int_1.jpg'
).replace(
  /\/images\/fleet\/force_traveller_cabin_view\.jpg/g, '/images/traveller_int_2.jpg'
).replace(
  /\/images\/fleet\/force_traveller_roof_tv\.jpg/g, '/images/traveller_int_3.jpg'
).replace(
  /\/images\/fleet\/force_traveller_rear\.png/g, '/images/traveller_rear.jpg'
).replace(
  /\/images\/fleet\/force_traveller_front\.png/g, '/images/traveller_front.jpg'
);

fs.writeFileSync('src/pages/Home.jsx', text);
console.log('Fixed galleries using exact replacements');
