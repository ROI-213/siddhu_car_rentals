const fs = require('fs');

// 1. Read the corrupted Home.jsx
let homeContent = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// 2. Read the restored uncorrupted array
let restoredArray = fs.readFileSync('restored_array.js', 'utf8');

// 3. Update the images in the restored array to match the user's NEW images from today
restoredArray = restoredArray.replace(
  /\/images\/fleet\/mercedes_s_class_front\.jpg|\/images\/fleet\/mercedes_s_class_rear\.jpg|\/images\/fleet\/mercedes_s_class_interior\.jpg/g,
  (match) => {
    if (match.includes('front')) return '/images/sclass_chauffeur.png';
    if (match.includes('interior')) return '/images/sclass_interior.jpg';
    if (match.includes('rear')) return '/images/sclass_rear.png';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/mercedes_s_class_chauffeur\.jpg/g, '/images/sclass_front.png');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/bmw_730ld_front_quarter\.png|\/images\/fleet\/bmw_730ld_interior_front\.png|\/images\/fleet\/bmw_730ld_interior_rear\.png|\/images\/fleet\/bmw_730ld_rear\.png/g,
  (match) => {
    if (match.includes('front_quarter')) return '/images/bmw_side.png';
    if (match.includes('interior_front')) return '/images/bmw_int_front.png';
    if (match.includes('interior_rear')) return '/images/bmw_int_rear.png';
    if (match.includes('rear')) return '/images/bmw_rear.png';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/bmw_730ld_front\.png/g, '/images/bmw_front.jpg');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/vellfire_front_quarter\.png|\/images\/fleet\/vellfire_interior_front\.png|\/images\/fleet\/vellfire_interior_rear\.png|\/images\/fleet\/vellfire_rear\.png/g,
  (match) => {
    if (match.includes('front_quarter')) return '/images/vellfire_side.png';
    if (match.includes('interior_front')) return '/images/vellfire_int_front.png';
    if (match.includes('interior_rear')) return '/images/vellfire_int_rear.png';
    if (match.includes('rear')) return '/images/vellfire_rear.jpg';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/vellfire_front\.png/g, '/images/vellfire_front.jpg');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/mercedes_e_class_cockpit\.png|\/images\/fleet\/mercedes_e_class_rear_cabin\.png|\/images\/fleet\/mercedes_e_class_front_cabin\.png|\/images\/fleet\/mercedes_e_class_wedding\.jpg/g,
  (match) => {
    if (match.includes('cockpit')) return '/images/eclass_dash.png';
    if (match.includes('front_cabin')) return '/images/eclass_front_seats.png';
    if (match.includes('rear_cabin')) return '/images/eclass_rear_seats.png';
    if (match.includes('wedding')) return '/images/eclass_rear_seats.png';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/mercedes_e_class_front\.jpg/g, '/images/eclass_front.jpg');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/audi_q7_interior\.png|\/images\/fleet\/audi_q7_cockpit\.png|\/images\/fleet\/audi_q7_rear_seats\.png/g,
  (match) => {
    if (match.includes('cockpit')) return '/images/audi_q7_front_seats.png';
    if (match.includes('interior')) return '/images/audi_q7_rear_seats_1.png';
    if (match.includes('rear')) return '/images/audi_q7_rear_seats_2.png';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/audi_q7\.jpg/g, '/images/audi_q7_side.png');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/honda_accord_interior_front\.jpg|\/images\/fleet\/honda_accord_interior_rear\.jpg/g,
  (match) => {
    if (match.includes('front')) return '/images/accord_front_seats.jpg';
    if (match.includes('rear')) return '/images/accord_rear_seats.jpg';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/honda_accord_front\.jpg/g, '/images/accord_front.jpg');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/innova_crysta_bronze_side\.png|\/images\/fleet\/innova_crysta_bronze_rear\.png|\/images\/fleet\/innova_crysta_bronze_profile\.png|\/images\/innova_crysta_luxury\.jpg/g,
  (match) => {
    if (match.includes('side')) return '/images/crysta_side.png';
    if (match.includes('rear')) return '/images/crysta_rear.png';
    return match; // Drop the extras or keep them
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/innova_crysta_bronze_front\.jpg/g, '/images/crysta_front.png');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/innova_hycross_side\.png|\/images\/fleet\/innova_hycross_rear\.png/g,
  (match) => {
    if (match.includes('side')) return '/images/hycross_side.png';
    if (match.includes('rear')) return '/images/hycross_back.png';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/innova_hycross_front\.png/g, '/images/hycross_front.jpg');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/toyota_commuter_side\.jpg|\/images\/fleet\/toyota_commuter_interior_tv\.jpg|\/images\/fleet\/toyota_commuter_cabin_lounge\.jpg|\/images\/fleet\/toyota_commuter_roof_lighting\.jpg/g,
  (match) => {
    if (match.includes('side')) return '/images/hiace_door_open.png';
    if (match.includes('tv')) return '/images/hiace_int_1.jpg';
    if (match.includes('lounge')) return '/images/hiace_int_2.jpg';
    if (match.includes('lighting')) return '/images/hiace_int_3.jpg';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/toyota_commuter\.jpg/g, '/images/hiace_front.png');

restoredArray = restoredArray.replace(
  /\/images\/fleet\/force_traveller_interior_seats\.jpg|\/images\/fleet\/force_traveller_cabin_view\.jpg|\/images\/fleet\/force_traveller_roof_tv\.jpg|\/images\/fleet\/force_traveller_rear\.png/g,
  (match) => {
    if (match.includes('seats')) return '/images/traveller_int_1.jpg';
    if (match.includes('view')) return '/images/traveller_int_2.jpg';
    if (match.includes('tv')) return '/images/traveller_int_3.jpg';
    if (match.includes('rear')) return '/images/traveller_rear.jpg';
    return match;
  }
);
restoredArray = restoredArray.replace(/\/images\/fleet\/force_traveller_front\.png/g, '/images/traveller_front.jpg');

// Strip off trailing bracket to append the buses
let finalArray = restoredArray.trim();
if (finalArray.endsWith(']')) {
  finalArray = finalArray.substring(0, finalArray.length - 1);
}

finalArray += \,
              {
                id: 'mini-bus',
                name: 'Luxury Mini Bus',
                modelYear: '2024 Corporate Coach',
                category: 'Corporate & Wedding AC Coach',
                categoryKey: 'coach',
                image: '/images/fleet/studio_mini_bus.jpg',
                gallery: [ '/images/fleet/studio_mini_bus.jpg' ],
                rating: 4.8,
                price: '8,000',
                period: '8h / 80km',
                passengerCapacity: 25,
                seatCategory: '21-25',
                luggageCapacity: 15,
                transmission: 'Manual',
                fuelType: 'Diesel',
                ac: 'Climate Control',
                badgeText: 'Event Transport',
                regPlate: 'KA 01',
                description: 'Ideal for medium-sized corporate teams, wedding guests, or family groups. Equipped with push-back seats, AC, and onboard entertainment.',
                tariffs: {},
                amenities: ['Push-Back Seats', 'Air Conditioned', 'Ample Luggage Space', 'PA System & Music']
              },
              {
                id: 'large-bus',
                name: 'Luxury Large Bus',
                modelYear: '2024 Event Coach',
                category: 'Premium Passenger Coach',
                categoryKey: 'coach',
                image: '/images/fleet/studio_large_bus.jpg',
                gallery: [ '/images/fleet/studio_large_bus.jpg' ],
                rating: 4.9,
                price: '12,000',
                period: '8h / 80km',
                passengerCapacity: 45,
                seatCategory: '32-45',
                luggageCapacity: 30,
                transmission: 'Manual',
                fuelType: 'Diesel',
                ac: 'Dual AC',
                badgeText: 'Premium Bus',
                regPlate: 'KA 01',
                description: 'The ultimate group transportation solution. Perfect for large weddings, corporate outings, and grand tours with premium comfort for all passengers.',
                tariffs: {},
                amenities: ['Premium Seats', 'Climate Control AC', 'Large Luggage Compartments', 'Air Suspension']
              }
            ]\;

// Now replace the corrupted block in Home.jsx
// From "{\[" all the way to "]" right before ".filter(v => showroomFilter"
const startIdx = homeContent.indexOf('{[\\n              {\\n                id: \\'mercedes-s-class\\'');
if (startIdx === -1) {
  console.log('Could not find start index in Home.jsx');
  process.exit(1);
}

const filterStr = '.filter(v => showroomFilter === \\'all\\' || v.categoryKey === showroomFilter)';
const endIdx = homeContent.indexOf(filterStr);
if (endIdx === -1) {
  console.log('Could not find end index in Home.jsx');
  process.exit(1);
}

const newHomeContent = homeContent.substring(0, startIdx) + finalArray + '\\n            ' + homeContent.substring(endIdx);
fs.writeFileSync('src/pages/Home.jsx', newHomeContent);
console.log('Replaced array successfully');
