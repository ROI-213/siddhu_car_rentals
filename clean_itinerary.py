with open("src/pages/Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Remove .summary-board-header block
content = re.sub(r'<div className="summary-board-header">.*?</div>\s*<div className="summary-board-divider"></div>', '', content, flags=re.DOTALL)

# Remove .dynamic-overview-content block
content = re.sub(r'<div className="dynamic-overview-content">.*?</div>\s*<div className="summary-board-divider"></div>', '', content, flags=re.DOTALL)

with open("src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(content)
