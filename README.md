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

# BookShop API

A backend API for managing a bookshop, including features for adding books, managing orders, and calculating revenue.

## Features

- **Book Management**:  
  Add books with fields such as:
  - Title
  - Author
  - Price
  - Category
  - Description
  - Quantity
  - Stock status  
  Input validation includes:
  - Required fields
  - Maximum length constraints
  - Restricting categories to a predefined list (e.g., Fiction, Science, SelfDevelopment).

- **Order Management**:  
  - Create orders with fields like:
    - Email
    - Product ID
    - Quantity
    - Total price  
  - Validate orders using schema validation (Zod).
  - Automatically update book stock upon order placement.

- **Revenue Calculation**:  
  - Calculate total revenue from all orders placed in the system.

- **Error Handling**:  
  - Return appropriate HTTP status codes and error messages for validation errors and system exceptions.

## Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)

## API Endpoints

### Books
- `POST /api/products`: Add a new book.  
  Example Request:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "price": 15.99,
    "category": "Fiction",
    "description": "A great book",
    "quantity": 50,
    "inStock": true
  }


### Get All Books
- `GET/api/products`  

###  Get a Specific Book
- `Get/api/products/:productId` 

### Books
- `Put /api/products/:productId`
### Delete a Book
- `Delete /api/products/:productId`
### Order a Book
- `POST /api/orders`: Add a new book.  
  Example Request:
  ```json
  {
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 30
  }
 
### Calculate Revenue
- `Get /api/orders/revenue`: Add a new book.  
 

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Validation**: Zod
- **ODM**: Mongoose

## How to Deploymeny
- Install the Vercel CLI if not already installed:
   ```bash
  npm install -g vercel
- Run the following commands
   ```bash
  vercel login
  vercel -prod



