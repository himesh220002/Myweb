import re
import json

file_path = '/home/himesh/MYProjects/Nextjs/Myweb/lib/data/projects.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Split the content by project objects. We can find them using `{ ... }` but that's hard with nested arrays.
# A simpler way: just split the content by 'features: [' and then find the closing bracket for features and insert elaborations.

def process_project(match):
    project_body = match.group(0)
    if 'elaborations:' in project_body:
        return project_body
    
    # We need to insert elaborations right before the closing brace of the project.
    # To do this safely, we find the last '}' in the match, which might be tricky if match spans multiple projects.
    # Instead, let's use a regex that matches a single project object.
    pass

# Alternative string manipulation
lines = content.split('\n')
new_lines = []
in_project = False
for i, line in enumerate(lines):
    new_lines.append(line)
    
    # If we see the end of a project object (indentation of 4 spaces + '},' or '}')
    if re.match(r'^    \},?$', line):
        # We need to check if we already added elaborations in this project.
        # Let's look backwards to see if there is an 'elaborations:' before the previous '    {'
        j = len(new_lines) - 2
        has_elaborations = False
        project_desc = "Built a robust technical architecture to ensure maximum performance and scalability."
        while j >= 0:
            if re.match(r'^    \{\s*$', new_lines[j]):
                break
            if 'elaborations:' in new_lines[j]:
                has_elaborations = True
            if 'description:' in new_lines[j]:
                # Extract description to make a somewhat relevant elaboration
                m = re.search(r'description:\s*"(.*)"', new_lines[j])
                if m:
                    project_desc = f"Engineered advanced solutions to deliver: {m.group(1)}"
            j -= 1
        
        if not has_elaborations:
            # Pop the closing brace, add the elaborations, and re-add the closing brace
            closing = new_lines.pop()
            
            # ensure previous line has a comma
            if len(new_lines) > 0 and not new_lines[-1].strip().endswith(',') and not new_lines[-1].strip() == '{':
                new_lines[-1] = new_lines[-1] + ','
                
            new_lines.append(f'        elaborations: [')
            new_lines.append(f'            "{project_desc}",')
            new_lines.append(f'            "Optimized core logic and utilized modern tooling to streamline execution.",')
            new_lines.append(f'            "Focused heavily on maintainability and structural integrity of the codebase."')
            new_lines.append(f'        ]')
            new_lines.append(closing)

with open(file_path, 'w') as f:
    f.write('\n'.join(new_lines))
