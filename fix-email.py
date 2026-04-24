#!/usr/bin/env python3
with open('src/app/admin/email-templates/page.tsx', 'r') as f:
    content = f.read()

# In template literals (backtick strings), ${ starts a JS expression
# The ${{ pattern confuses TS - replace dollar-sign before {{
# Use \${ which in template literal becomes just ${
content = content.replace('${{', '\\${')
content = content.replace('}}', '}}')

with open('src/app/admin/email-templates/page.tsx', 'w') as f:
    f.write(content)

print("Fixed")
