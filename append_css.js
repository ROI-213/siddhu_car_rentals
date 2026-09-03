import fs from 'fs';
const cssPath = './src/components/home/CinematicHero.css';
let content = fs.readFileSync(cssPath, 'utf8');

content += `
.cinematic-right-pane {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.hero-floating-vehicle {
  width: 120%;
  max-width: 900px;
  transform: translateX(10%);
  filter: drop-shadow(0 30px 40px rgba(0,0,0,0.4));
  transition: transform 0.3s ease;
}
`;

fs.writeFileSync(cssPath, content);
console.log('Appended CSS');
