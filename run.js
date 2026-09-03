const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Helper to replace gallery
const replaceGallery = (oldGalleryRegex, newGallery) => {
  content = content.replace(oldGalleryRegex, `newGallery`);
};

replaceGallery(
/gallery: \[\s*'\\/images\\/sclass_front\\.png',\s+'\\/images\\/fleet\\/mercedes_s_class_front\\.jpg',\s+'\\/images\\/fleet\\/mercedes_s_class_rear\\.jpg',\s+''\\/images\\/fleet\\/mercedes_s_class_interior\\.jpg'\s*\]/g,
`gallery: [
                  '/images/sclass_front.png',
                  '/images/sclass_chauffeur.png',
                  '/images/sclass_interior.jpg',
                  '/images/sclass_rear.png'
                ]`
);

replaceGallery(
/gallery: \[\+'\\/images\\/bmw_front\\.jpg',\s+'\\/images\\/fleet\\/bmw_730ld_front_quarter\\.png',\s+''\\/images\\/fleet\\/bmw_730ld_interior_front\\.png',\s+''\\/images\\/fleet\\/bmw_730ld_interior_rear\\.png',\s+'\\/images\\/fleet\\/bmw_730ld_rear\\.png'\s*\]/g,
`gallery: [
                  '/images/bmw_front.jpg',
                  '/images/bmw_side.png',
                  '/images/bmw_int_front.png',
                  '/images/bmw_int_rear.png',
                  '/images/bmw_rear.png'
                ]`
);

replaceGallery(
/gallery: \[\s*''\/images\\/vellfire_front\\.jpg',\s+'\\/images\\/fleet\\/zellfire_front_quarter\\.png',\s+'\\/images\\/fleet\\/zellfire_interior_front\\.png',\s+'\\/images\\/fleet\\/vellfire_interior_rear\\.png',\s+'\\/images\\/fleet\\/vellfire_rear\\.png'\s*\]/g,
`gallery: [
                  '/images/vellfire_front.jpg',
                  '/images/vellfire_side.png',
                  '/images/vellfire_int_front.png',
                  '/images/vellfire_int_rear.png',
                  '/images/vellfire_rear.jpg'
                ]`
);

replaceGallery(
/gallery: \[\s*''\/images\\/eclass_front\\.jpg',\s+'\\/images\\/fleet\\/mercedes_e_class_cockpit\\.png',\s+'\\/images\\/fleet\\/mercedes_e_class_rear_cabin\\.png',\s+''\\/images\\/fleet\\/mercedes_e_class_front_cabin\\.png',\s+'\\/images\\/fleet\\/mercedes_e_class_wedding\\.jpg'\s*\]/g,
`gallery: [
                  '/images/eclass_front.jpg',
                  '/images/eclass_dash.png',
                  '/images/eclass_front_seats.png',
                  '/images/eclass_rear_seats.png'
                ]`
);

replaceGallery(
/gallery: \[\+'\\/images\\/audi_q7_side\\.png',\s+'\\/images\\/fleet\\/audi_q7_interior\\.png',\s+'\\/images\\/fleet\\/audi_q7_cockpit\\.png',\s+'\\/images\\/fleet\\/audi_q7_rear_seats\\.png'\s*\]/g,
`gallery: [
                  '/images/audi_q7_side.png',
                  '/images/audi_q7_front_seats.png',
                  '/images/audi_q7_rear_seats_1.png',
                  '/images/audi_q7_rear_seats_2.png'
                ]`
);

replaceGallery(
/gallery: \[\s*'\\/images\\/accord_front\\.jpg',\s+'\\/images\\/fleet\\/honda_accord_interior_front\\.jpg',\s+''\\/images\\/fleet\\/honda_accord_interior_rear\\.jpg'\s*\]/g,
`gallery: [
                  '/images/accord_front.jpg',
                  '/images/accord_front_seats.jpg',
                  '/images/accord_rear_seats.jpg'
                ]`
);

replaceGallery(
/gallery: \[\s*''\/images\\/crysta_front\\.png',\s+'\\/images\\/fleet\\/innova_crysta_bronze_side\\.png',\s+'\\/images\\/fleet\\/innova_crysta_bronze_rear\\.png',\s+'\\/images\\/fleet\\/innova_crysta_bronze_profile\\.png',\s+'\\/images\\/innova_crysta_luxury\\.jpg'\s*\]/g,
`gallery: [
                  '/images/crysta_front.png',
                  '/images/crysta_side.png',
                  '/images/crysta_rear.png'
                ]`
);

replaceGallery(
/gallery: \[\+'\\/images\\/hycross_front\\.jpg',\s+''\\/images\\/fleet\\/innova_hycross_side\\.png',\s+'\\/images\\/fleet\\/innova_hycross_rear\\.png'\s*\]/g,
`gallery: [
                  '/images/hycross_front.jpg',
                  '/images/hycross_side.png',
                  '/images/hycross_back.png'
                ]`
);

replaceGallery(
/gallery: \[\+'\\/images\\/hiace_front\\.png',\s+'\\/images\\/fleet\\/toyota_commuter_side\\.jpg',\s+'\\/images\\/fleet\\/toyota_commuter_interior_tv\\.jpg',\s+'\\/images\\/fleet\\/toyota_commuter_cabin_lounge\\.jpg',\s+'\\/images\\/fleet\\/toyota_commuter_roof_lighting\\.jpg'\s*\]/g,
`gallery: [
                  '/images/hiace_front.png',
                  '/images/hiace_door_open.png',
                  '/images/hiace_int_1.jpg',
                  '/images/hiace_int_2.jpg',
                  '/images/hiace_int_3.jpg'
                ]`
);

replaceGallery(
/gallery: \[\s*'\\/images\\/traveller_front\\.jpg',\s+'\\/images\\/fleet\\/force_traveller_interior_seats\\.jpg',\s+''\\/images\\/fleet\\/force_traveller_cabin_view\\.jpg',\s+'\\/images\\/fleet\\/force_traveller_roof_tv\\.jpg',\s+''\\/images\\/fleet\\/force_traveller_rear\\.png'\s*\]/g,
`gallery: [
                  '/images/traveller_front.jpg',
                  '/images/traveller_int_1.jpg',
                  '/images/traveller_int_2.jpg',
                  '/images/traveller_int_3.jpg',
                  '/images/traveller_rear.jpg'
                ]`
);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Done replacing Home.jsx');

