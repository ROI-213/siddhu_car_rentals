import fs from 'fs';
const homePath = './src/pages/Home.jsx';
let content = fs.readFileSync(homePath, 'utf8');

// Find the start of the tariff section in Home.jsx. It might be labelled.
// Let's search for some keywords like "Tariff" or "Rate" or a specific section comment.
// Let's just find the `export const Home` and insert it near the bottom if there isn't one,
// or replace the existing one. 
// Since I don't know the exact string, I will import TransparentTariff and append it right before the closing </div> of the Home component.

const importPoint = content.indexOf(`import { CinematicHero }`);
if (!content.includes(`import { TransparentTariff }`)) {
    content = content.substring(0, importPoint) + `import { TransparentTariff } from '../components/home/TransparentTariff';\n` + content.substring(importPoint);
}

// In Home.jsx, the return statement returns a <div>.
// Let's find `export const Home`... `return (`... `</div>`
const lastDivIndex = content.lastIndexOf('</div>\n    </div>\n  );\n};');
if (lastDivIndex === -1) {
    // try another way to find the end
    const endString = '  );\n};\n';
    const endIndex = content.lastIndexOf(endString);
    if (endIndex !== -1) {
        // insert before the last closing tags
        const insertPoint = content.lastIndexOf('</div>', endIndex);
        content = content.substring(0, insertPoint) + `\n      <TransparentTariff onBook={scrollToEnquiry} />\n` + content.substring(insertPoint);
    }
} else {
    content = content.substring(0, lastDivIndex) + `\n      <TransparentTariff onBook={scrollToEnquiry} />\n` + content.substring(lastDivIndex);
}

fs.writeFileSync(homePath, content);
console.log('Inserted TransparentTariff section');
