const fs = require('fs');
let text = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// 1. Add to VEHICLES_DATA array (dropdown)
const travellerDropdown = "{ id: 'traveller', name: 'Force Traveller Luxury AC', subtitle: 'VIP Group Coach', seats: '16+1 Seats', bags: '10 Bags', img: '/images/traveller_front.jpg', priceTag: 'VIP Group' }";
const newDropdowns = travellerDropdown + ",\n    { id: 'mini_bus', name: 'Luxury Mini Bus (21-25 Seater)', subtitle: 'Corporate & Wedding', seats: '21-25 Seats', bags: '15 Bags', img: '/images/fleet/studio_mini_bus.jpg', priceTag: 'Group AC' },\n    { id: 'large_bus', name: 'Luxury Large Bus (32-45 Seater)', subtitle: 'Large Event Transport', seats: '32-45 Seats', bags: '30 Bags', img: '/images/fleet/studio_large_bus.jpg', priceTag: 'Event Coach' }";
text = text.replace(travellerDropdown, newDropdowns);

// 2. Add to preview gallery inline array
const travellerGallery = \
              {
                id: 'traveller',
                name: 'Force Traveller Luxury AC',
                badge: 'Group Travel',
                tag: 'VIP Coach',
                seats: '16+1',
                suitcases: '10',
                description: 'The most comfortable group travel experience. Features push-back seats, personal AC vents, and a high-roof design for easy movement inside.',
                image: '/images/traveller_front.jpg',
                gallery: [
                  '/images/traveller_front.jpg',
                  '/images/traveller_int_1.jpg',
                  '/images/traveller_int_2.jpg',
                  '/images/traveller_int_3.jpg',
                  '/images/traveller_rear.jpg'
                ]
              }
\;
const newGallery = travellerGallery.trim() + \,
              {
                id: 'mini-bus',
                name: 'Luxury Mini Bus (21-25 Seater)',
                badge: 'Group Travel',
                tag: 'VIP Coach',
                seats: '21-25',
                suitcases: '15',
                description: 'Ideal for medium-sized corporate teams, wedding guests, or family groups. Equipped with push-back seats, AC, and onboard entertainment.',
                image: '/images/fleet/studio_mini_bus.jpg',
                gallery: [
                  '/images/fleet/studio_mini_bus.jpg'
                ]
              },
              {
                id: 'large-bus',
                name: 'Luxury Large Bus (32-45 Seater)',
                badge: 'Event Transport',
                tag: 'Premium Bus',
                seats: '32-45',
                suitcases: '30',
                description: 'The ultimate group transportation solution. Perfect for large weddings, corporate outings, and grand tours with premium comfort for all passengers.',
                image: '/images/fleet/studio_large_bus.jpg',
                gallery: [
                  '/images/fleet/studio_large_bus.jpg'
                ]
              }\;

text = text.replace(travellerGallery.trim(), newGallery);
fs.writeFileSync('src/pages/Home.jsx', text);
console.log('Added buses');
