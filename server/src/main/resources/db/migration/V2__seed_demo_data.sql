-- Insert sample tags
INSERT INTO tags (name, category) VALUES
    -- Languages
    ('Spanish', 'language'),
    ('French', 'language'),
    ('German', 'language'),
    ('Italian', 'language'),
    ('Mandarin', 'language'),
    ('Arabic', 'language'),
    ('Portuguese', 'language'),
    ('Russian', 'language'),
    ('Japanese', 'language'),
    ('Korean', 'language'),
    
    -- Tech skills
    ('JavaScript', 'tech'),
    ('Python', 'tech'),
    ('React', 'tech'),
    ('Java', 'tech'),
    ('Machine Learning', 'tech'),
    ('Web Development', 'tech'),
    ('Mobile Development', 'tech'),
    ('Data Science', 'tech'),
    
    -- Creative skills
    ('Guitar', 'creative'),
    ('Piano', 'creative'),
    ('Photography', 'creative'),
    ('Drawing', 'creative'),
    ('Writing', 'creative'),
    ('Singing', 'creative'),
    ('Video Editing', 'creative'),
    
    -- Life skills
    ('Cooking', 'life'),
    ('Gardening', 'life'),
    ('Fitness', 'life'),
    ('Yoga', 'life'),
    ('Meditation', 'life'),
    ('Public Speaking', 'life'),
    
    -- Academic
    ('Mathematics', 'academic'),
    ('Physics', 'academic'),
    ('Chemistry', 'academic'),
    ('Biology', 'academic'),
    ('Economics', 'academic'),
    ('History', 'academic'),
    ('Philosophy', 'academic');

-- Insert demo users for development
-- Password is "password123" bcrypt hashed with cost 10
INSERT INTO users (id, username, email, password_hash, display_name, bio, role, city) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'johndoe', 'john@example.com', '$2a$10$YourHashedPasswordHere', 'John Doe', 'Passionate language learner and tech enthusiast', 'LEARNER', 'London'),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'janesmith', 'jane@example.com', '$2a$10$YourHashedPasswordHere', 'Jane Smith', 'Experienced teacher, love sharing knowledge', 'TEACHER', 'London');