# Futuristic Todo App with JWT Auth

A fullstack Todo web application built with Node.js, Express, MongoDB, EJS, Tailwind CSS, and JWT authentication. Users can sign up, log in, add, edit, and delete their own tasks. The UI is styled with Tailwind and features smooth animations.

## Features
- User registration and login with JWT authentication
- Passwords securely hashed with bcrypt
- Add, edit, and delete personal tasks
- Only see your own tasks after login
- Modern, responsive UI with Tailwind CSS
- Animated interactions using the Web Animations API

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** EJS templates, Tailwind CSS (CDN), Web Animations API
- **Auth:** JWT (JSON Web Tokens), bcrypt

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) running locally or in the cloud

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/sehgalaayu/todo-fullstack-jwt.git
   cd todo-fullstack-jwt
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start MongoDB** (if not already running):
   ```sh
   mongod
   ```
4. **Start the server:**
   ```sh
   node app.js
   ```
5. **Open your browser and visit:**
   - [http://localhost:3000/signup](http://localhost:3000/signup) to register
   - [http://localhost:3000/signin](http://localhost:3000/signin) to log in
   - [http://localhost:3000/todos](http://localhost:3000/todos) to manage your tasks

## Project Structure
```
todo-fullstack-with-auth/
  app.js
  models/
    user.js
    tasks.js
  utils/
    jwt.js
  views/
    signup.ejs
    signin.ejs
    todo.ejs
    edit.ejs
  public/
  package.json
  README.md
```

## Customization
- **Styling:** Tailwind CSS is loaded via CDN. You can further customize the look by editing the EJS files.
- **Animations:** Uses the Web Animations API for smooth hover effects. You can add more advanced animations with Anime.js or GSAP if desired.

## License
This project is open source and available under the [ISC License](LICENSE). 
