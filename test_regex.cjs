const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

const regex = /<div className="editorial-quote-subrow">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<style>/;
const match = content.match(/<div className="editorial-quote-subrow">([\s\S]*?)(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<style>)/);

if(match) {
    let cardsHTML = match[1].trim(); // This is just the cards, wait, it has an extra </div> from editorial-quote-subrow!
    
    // Actually let's use exact string replace for the HTML part.
    console.log("Matched");
}
