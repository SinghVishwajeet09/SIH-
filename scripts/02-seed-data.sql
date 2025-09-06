-- Seed data for Smart Student Hub

-- Insert default activity categories
INSERT OR IGNORE INTO activity_categories (name, description, credit_multiplier) VALUES
('Academic', 'Academic achievements, research, publications', 1.0),
('Extracurricular', 'Clubs, societies, student organizations', 0.8),
('Professional', 'Internships, work experience, certifications', 1.2),
('Volunteer', 'Community service, volunteer work', 0.9),
('Sports', 'Athletic activities, competitions', 0.7),
('Leadership', 'Leadership roles, organizing events', 1.1),
('Creative', 'Arts, music, creative projects', 0.8),
('Technical', 'Coding projects, hackathons, technical skills', 1.0);

-- Insert system settings
INSERT OR IGNORE INTO system_settings (setting_key, setting_value, description) VALUES
('min_credits_per_semester', '20', 'Minimum credits required per semester'),
('max_credits_per_activity', '10', 'Maximum credits that can be earned from a single activity'),
('auto_approval_threshold', '5', 'Credit threshold below which activities are auto-approved'),
('portfolio_template', 'default', 'Default portfolio template for students');

-- Insert sample admin user (password: admin123)
INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, role, department) VALUES
('admin@university.edu', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'System', 'Administrator', 'admin', 'IT');

-- Insert sample faculty users
INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, role, department) VALUES
('prof.smith@university.edu', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'John', 'Smith', 'faculty', 'Computer Science'),
('prof.johnson@university.edu', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Sarah', 'Johnson', 'faculty', 'Business Administration'),
('prof.williams@university.edu', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Michael', 'Williams', 'faculty', 'Engineering');

-- Insert sample students
INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, role, student_id, department) VALUES
('alice.student@university.edu', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Alice', 'Cooper', 'student', 'STU001', 'Computer Science'),
('bob.student@university.edu', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Bob', 'Wilson', 'student', 'STU002', 'Business Administration'),
('carol.student@university.edu', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Carol', 'Davis', 'student', 'STU003', 'Engineering');
