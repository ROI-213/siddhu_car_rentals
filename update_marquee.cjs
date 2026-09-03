const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');

const regex = /<div className="editorial-quote-subrow">([\s\S]*?)<\/div>\s*(?=<\/div>\s*<\/div>\s*<\/div>\s*<style>)/;
const match = content.match(regex);

if(match) {
    let cardsHTML = match[1].trim(); 

    let newHTML = `
                {/* Marquee Row for Cards 2 & 3 */}
                <div className="testimonial-marquee-wrapper">
                  <div className="testimonial-marquee-track">
                    <div className="marquee-set">
                      ${cardsHTML}
                    </div>
                    <div className="marquee-set">
                      ${cardsHTML}
                    </div>
                  </div>
                </div>`;
                
    content = content.replace(regex, newHTML);
    
    // Now add the CSS for it!
    const oldCssRegex = /\.editorial-quote-subrow {[\s\S]*?}/;
    const newCss = `
            .testimonial-marquee-wrapper {
              overflow: hidden;
              width: 100%;
              position: relative;
            }
            .testimonial-marquee-track {
              display: flex;
              gap: 24px;
              width: max-content;
              animation: marqueeSlide 15s linear infinite;
            }
            .testimonial-marquee-track:hover {
              animation-play-state: paused;
            }
            .marquee-set {
              display: flex;
              gap: 24px;
            }
            .marquee-set > .editorial-quote-card {
              width: 340px;
              flex-shrink: 0;
            }
            @keyframes marqueeSlide {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 12px)); }
            }`;
            
    content = content.replace(oldCssRegex, newCss);
    
    // Also remove media query for .editorial-quote-subrow
    content = content.replace(
      /\.editorial-quote-subrow {\s*display: flex;\s*flex-direction: column;\s*gap: 20px;\s*}/,
      `.testimonial-marquee-wrapper {\n                width: 100vw;\n                position: relative;\n                left: 50%;\n                right: 50%;\n                margin-left: -50vw;\n                margin-right: -50vw;\n                padding: 0 20px;\n              }`
    );
    
    fs.writeFileSync('./src/pages/Home.jsx', content);
    console.log("Updated!");
} else {
    console.log("Not matched");
}
