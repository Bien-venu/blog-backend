# Simple Blog Backend

## Overview
QT Practical Test for Software Developers (Interns)  
**Task:** Develop a simple blog application backend  

## Technologies Recommended
- **Database:** PostgreSQL
- **Backend:** Node.js (Express)

## Requirements

## Environment Setup
1. git clone this repository && cd to the project directory
2. run `npm install` to install dependencies
3. create a `.env` file in the root project directory
4. copy the `.env.example` to the `.env` file and update it accordingly
5. run `npm run start` to run project

### Backend

1. **User Authentication:**
   - Implement user registration and login.
   - Use JWT for authentication.

2. **Blog Post Management:**
   - Create models for `Post` and `Comment`.
   - A `Post` should have a title, content, author, and timestamps.
   - A `Comment` should be linked to a `Post`, have content, author, and timestamps.

3. **API Endpoints:**
   - CRUD operations for `Post` and `Comment`.
   - Authentication endpoints (login, register).

### API Endpoints

#### Authentication
| Method | Endpoint    | Description                    |
|--------|-------------|--------------------------------|
| POST   | /auth/register | Register a new user            |
| POST   | /auth/login    | Log in with username and password |

#### Blog Post
| Method | Endpoint         | Description                             |
|--------|------------------|-----------------------------------------|
| POST   | /posts            | Create a new blog post (Authenticated)  |
| GET    | /posts            | Get a list of all blog posts            |
| GET    | /posts/:id        | Get a specific blog post by ID           |
| PUT    | /posts/:id        | Update a blog post (Authenticated)      |
| DELETE | /posts/:id        | Delete a blog post (Authenticated)      |

#### Comments
| Method | Endpoint                | Description                                |
|--------|-------------------------|--------------------------------------------|
| POST   | /comments               | Add a comment to a blog post (Authenticated) |
| GET    | /comments/:postId        | Get all comments for a specific blog post  |
| PUT    | /comments/:id            | Update a comment (Authenticated)          |
| DELETE | /comments/:id            | Delete a comment (Authenticated)          |

## SQL Script

Here's the SQL script to create the necessary database tables and insert sample data:

```sql
-- SQL Script for Simple Blog Application

-- Create tables

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Ensure passwords are hashed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data

-- Insert users
INSERT INTO users (username, password) VALUES
('john_doe', '$2b$12$kQ4Sx5VbVfZG8c6wZs.tae4j1KZKfA8DgRH1T6p9k6Nf4CTG3Zwfy'), -- password: 'password123'
('jane_smith', '$2b$12$wLP7V8/jdZJ5TeDNRhXOTeIm7RaItW6R/F26O5FbxPr.Qh2Fj/OGK'); -- password: 'securepassword'

-- Insert posts
INSERT INTO posts (title, content, author_id) VALUES
('First Post', 'This is the content of the first post.', 1),
('Second Post', 'This is the content of the second post.', 2);

-- Insert comments
INSERT INTO comments (content, author_id, post_id) VALUES
('Great post!', 2, 1),
('Thanks for sharing!', 1, 2);