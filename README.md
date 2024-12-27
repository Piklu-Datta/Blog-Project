# Blogging Platform Backend

## Overview
The Blogging Platform Backend is a secure and scalable REST API built using TypeScript, Node.js, Express.js, and MongoDB. It supports user authentication, role-based access control, and provides public access to blog posts with advanced search, sort, and filter functionalities. The system distinguishes between two roles: Admin and User, with each having specific permissions.

## Features
### User Roles
**Admin:**
- Created manually in the database with predefined credentials.
- Can delete any blog.
- Can block any user by setting the `isBlocked` flag.
- Cannot update any blog.

**User:**
- Can register and log in.
- Can create, update, and delete their own blogs.
- Cannot perform admin-specific actions.

### Authentication & Authorization
- **Authentication:** Users must log in to access write, update, and delete operations.
- **Authorization:** Admin and User roles are differentiated and secured.

### Blog API
- Provides a public API for viewing blogs.
- Supports search, sorting, and filtering functionalities.

## Technologies
- **Language:** TypeScript
- **Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose

## Models
### User Model
```typescript
{
  name: string; // Full name of the user
  email: string; // Email address (unique)
  password: string; // Securely hashed password
  role: "admin" | "user"; // User role (default: "user")
  isBlocked: boolean; // Indicates if the user is blocked (default: false)
  createdAt: Date; // Timestamp when the user was created
  updatedAt: Date; // Timestamp of the last update
}
```

### Blog Model
```typescript
{
  title: string; // Title of the blog post
  content: string; // Main content of the blog post
  author: ObjectId; // Reference to the User model
  isPublished: boolean; // Indicates if the blog is published (default: true)
  createdAt: Date; // Timestamp when the blog was created
  updatedAt: Date; // Timestamp of the last update
}
```

## API Endpoints

### 1. Authentication
#### 1.1 Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
- **201:** User registered successfully.
- **400:** Validation error.

#### 1.2 Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
- **200:** Login successful, returns a JWT token.
- **401:** Invalid credentials.

### 2. Blog Management
#### 2.1 Create Blog
**Endpoint:** `POST /api/blogs`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**
- **201:** Blog created successfully.
- **400:** Validation error.

#### 2.2 Update Blog
**Endpoint:** `PATCH /api/blogs/:id`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**
- **200:** Blog updated successfully.
- **403:** Unauthorized action.

#### 2.3 Delete Blog
**Endpoint:** `DELETE /api/blogs/:id`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

**Response:**
- **200:** Blog deleted successfully.
- **403:** Unauthorized action.

#### 2.4 Get All Blogs (Public)
**Endpoint:** `GET /api/blogs`

**Query Parameters:**
- `search`: Search blogs by title or content.
- `sortBy`: Sort blogs by fields like `createdAt` or `title`.
- `sortOrder`: Sort order (`asc` or `desc`).
- `filter`: Filter blogs by author ID.

**Response:**
- **200:** Blogs fetched successfully.

### 3. Admin Actions
#### 3.1 Block User
**Endpoint:** `PATCH /api/admin/users/:userId/block`

**Headers:**
```plaintext
Authorization: Bearer <admin_token>
```

**Response:**
- **200:** User blocked successfully.

#### 3.2 Delete Blog
**Endpoint:** `DELETE /api/admin/blogs/:id`

**Headers:**
```plaintext
Authorization: Bearer <admin_token>
```

**Response:**
- **200:** Blog deleted successfully.

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/blogging-platform-backend.git
```

2. Navigate to the project directory:
```bash
cd blogging-platform-backend
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
```plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

5. Start the server:
```bash
npm run dev
```

## Usage
- Use a tool like Postman or cURL to interact with the API.
- Admin credentials must be manually added to the database.

## License
This project is licensed under the MIT License.

---

Feel free to contribute and suggest improvements!






