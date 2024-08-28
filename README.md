# Teacher Portal with Student Management

## Overview

This is a robust teacher portal built with Ruby on Rails (RoR), HTML, JavaScript, and Bootstrap. The portal allows teachers to:

- Log in with credentials
- View and manage a list of students (CRUD operations)
- Add new students and update existing student records
- Inline editing and state management for student data

## Features

### 1. **Login Functionality**
- Teachers can log in using their email and password.
- User authentication with error handling.
- Redirects to the teacher portal upon successful login.

### 2. **Teacher Portal Home & Student Listing**
- Displays a list of students with their Names, Subjects, and Marks.
- Options to edit and delete student details inline.
- Responsive design using Bootstrap.

### 3. **Student Management**
- Add a new student using a modal popup.
- If a student with the same name and subject already exists, the marks are updated.
- Full CRUD operations: Create, Read, Update, Delete.

## Technology Stack

- **Frontend:** HTML, CSS (Bootstrap), JavaScript (Vanilla)
- **Backend:** Ruby on Rails
- **Database:** PostgreSQL
- **Testing:** RSpec, FactoryBot

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Ruby `3.0.0`
- Rails `7.0.8.4`
- Postgres (for local development)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/HasrhitSrivastava/teacher-portal.git
   cd teacher-portal
   rails db:create db:migrate db:seed
   run the rails server by using: rails -s
   default credentials for teacher
   email: teacher@gmail.com
   password: Teacher@321

