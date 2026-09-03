with open("src/pages/Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

import re
# Find all occurrences of '//'
for match in re.finditer(r'//', content):
    start = max(0, match.start() - 20)
    end = min(len(content), match.end() + 20)
    print(f"Found at {match.start()}: {content[start:end]}")
