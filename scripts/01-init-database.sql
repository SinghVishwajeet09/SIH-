-- Smart Student Hub Database Schema
-- SQLite Database Initialization

-- Users table (for both students and faculty)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT CHECK(role IN ('student', 'faculty', 'admin')) NOT NULL,
    student_id TEXT UNIQUE, -- Only for students
    department TEXT,
    profile_image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Activity categories
CREATE TABLE IF NOT EXISTS activity_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    credit_multiplier REAL DEFAULT 1.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    hours_spent INTEGER,
    credits_earned REAL DEFAULT 0,
    status TEXT CHECK(status IN ('draft', 'submitted', 'approved', 'rejected')) DEFAULT 'draft',
    submission_date DATETIME,
    approval_date DATETIME,
    approved_by INTEGER, -- faculty user id
    feedback TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES activity_categories(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- Activity documents/attachments
CREATE TABLE IF NOT EXISTS activity_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activity_id INTEGER NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT,
    file_size INTEGER,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Student goals
CREATE TABLE IF NOT EXISTS student_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_credits REAL,
    target_date DATE,
    status TEXT CHECK(status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Faculty delegations (for approval workflows)
CREATE TABLE IF NOT EXISTS faculty_delegations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    delegator_id INTEGER NOT NULL,
    delegate_id INTEGER NOT NULL,
    category_id INTEGER, -- NULL means all categories
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (delegator_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (delegate_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES activity_categories(id)
);

-- System settings
CREATE TABLE IF NOT EXISTS system_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
