** Make it only as study material..

# Social Media Post App  

This is a **social media post application** built using **React, Redux Toolkit, and JSON Server**. The app allows users to post thoughts, like and comment on posts, and receive real-time updates.

## Features  

- **User Authentication**:  
  - Signup and login functionality  
  - Stores user data in local storage  

- **Posts Management**:  
  - Create, edit, and delete posts  
  - Like/unlike posts  
  - View all posts  

- **Comments System**:  
  - Add comments to posts  
  - Edit and delete comments  
  - Like/unlike comments  

- **Real-Time Updates**:  
  - Updates posts and comments dynamically  

- **Data Storage**:  
  - Uses **JSON Server** (`http://localhost:5000/posts`) instead of local storage  

## Technologies Used  

- **Frontend**:  
  - React  
  - Redux Toolkit  
  - React Hooks (`useState`, `useEffect`, `useDispatch`, `useSelector`)  
  - Lucide React Icons  

- **Backend (Mock API)**:  
  - JSON Server for data persistence  

## Getting Started  

### Prerequisites  
- Node.js installed on your system  

### Installation  

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/your-repo/social-media-post-app.git
   cd social-media-post-app
   ```

2. **Install dependencies:**  
   ```sh
   npm install
   ```

3. **Start JSON Server:**  
   ```sh
   json-server --watch db.json --port 5000
   ```

4. **Run the React App:**  
   ```sh
   npm start
   ```

### JSON Server Configuration  

- Ensure **db.json** is correctly structured:  
  ```json
  {
    "posts": [
      {
        "id": "1",
        "content": "Hello, world!",
        "author": "JohnDoe",
        "time": "2025-02-09T10:00:00Z",
        "likes": 5,
        "likedBy": ["JaneDoe"],
        "comments": [
          {
            "id": "101",
            "author": "JaneDoe",
            "text": "Great post!",
            "likes": 2,
            "likedBy": ["JohnDoe"]
          }
        ]
      }
    ]
  }
  ```

## API Endpoints  

- **GET /posts** - Fetch all posts  
- **POST /posts** - Create a new post  
- **PUT /posts/:id** - Update a post  
- **DELETE /posts/:id** - Delete a post  

## Future Improvements  

- User authentication with a backend  
- Real-time WebSocket-based updates  
- Profile pages for users  
- Image upload feature  

## License  

This project is open-source. Feel free to modify and contribute!
