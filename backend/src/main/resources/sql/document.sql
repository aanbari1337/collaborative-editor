-- Create the table (if it doesn't already exist)
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Insert demo data into the table
INSERT INTO document (title, content, created_at) VALUES
('Document 1', '# Markdown Title\n\nThis is some markdown content.', '2024-11-01 10:00:00'),
('Document 2', '## Subtitle\n\nAnother markdown document with more content.', '2024-11-02 12:30:00'),
('Meeting Notes', '- Item 1\n- Item 2\n- Item 3', '2024-11-03 09:15:00'),
('Technical Design', '```javascript\nconsole.log("Code block");\n```', '2024-11-04 14:45:00'),
('Shopping List', '- Apples\n- Bananas\n- Milk\n- Bread', '2024-11-05 17:20:00'),
('Random Thoughts', '_Some italic text_\n\n**And some bold text**', '2024-11-06 11:00:00'),
('Project Plan', '# Project Plan\n\n## Goals\n1. Complete the prototype.\n2. Test thoroughly.\n3. Deploy.', '2024-11-07 08:00:00'),
('Daily Journal', 'Today I learned about SQL and Markdown integration. **It was fun!**', '2024-11-08 18:30:00');
