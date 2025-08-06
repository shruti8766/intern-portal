CREATE DATABASE intern_portal;
USE intern_portal;

CREATE TABLE interns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    donations DECIMAL(10,2) DEFAULT 0,
    referrals INT DEFAULT 0,
    goal_completion DECIMAL(5,2) DEFAULT 0
);

INSERT INTO interns (name, referral_code, donations, referrals, goal_completion) VALUES
    ('John Doe', 'john2025', 12000, 5, 80),
    ('Jane Smith', 'jane2025', 8000, 3, 53.33),
    ('Alice Johnson', 'alice2025', 15000, 7, 100),
    ('Bob Wilson', 'bob2025', 6000, 2, 40),
    ('Emma Brown', 'emma2025', 10000, 4, 66.67);