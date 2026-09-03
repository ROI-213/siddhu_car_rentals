import re

with open("src/pages/Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Naive un-flattening
content = content.replace("import ", "\nimport ")
content = content.replace("export ", "\nexport ")
content = content.replace("<div", "\n<div")
content = content.replace("</div>", "\n</div>\n")
content = content.replace("<section", "\n<section")
content = content.replace("</section>", "\n</section>\n")
content = content.replace("<span", "\n<span")
content = content.replace("</span>", "\n</span>\n")
content = content.replace("{/*", "\n{/*")
content = content.replace("*/}", "*/}\n")
content = content.replace(";", ";\n")

# Re-save
with open("src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(content)
