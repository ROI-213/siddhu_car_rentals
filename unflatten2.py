import re

with open("src/pages/Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add newlines around all HTML/JSX tags
content = re.sub(r'(<[A-Za-z/])', r'\n\1', content)
content = re.sub(r'(>)(?!([^<]*>))', r'\1\n', content)
content = content.replace("/>", "/>\n")
content = content.replace(";", ";\n")
content = content.replace("{", "{\n")
content = content.replace("}", "\n}")

with open("src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(content)
