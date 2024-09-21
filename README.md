# Todo App Backend

This is a simple backend application built using Node.js, Express, MongoDB, and JWT for user authentication. It allows users to sign up, sign in, and manage their todo tasks securely. Also, the data is stored in MongoDB database.

## Features

- **User Signup**: Allows users to create an account with a secure password validation system.
- **User Signin**: Enables users to log in and receive a JWT token for subsequent requests.
- **Add Todo**: Authenticated users can add todo tasks.
- **Get Todos**: Authenticated users can retrieve their list of tasks.
- **JWT Authentication**: Secure routes using JSON Web Token (JWT).

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=json-web-tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-E9E9E9?style=flat&logo=hashnode&logoColor=black)
![Zod](https://img.shields.io/badge/Zod-blue?style=flat&logo=typescript&logoColor=white)

## Usage

### Mongoose

- **Purpose**: Mongoose is used to interact with the MongoDB database.
- **Usage in Code**:
  - Models are defined for User and Todo entities using Mongoose, allowing for easy data manipulation.
  - Example:
    ```javascript
    const { UserModel, TodoModel } = require("./dataBase");
    ```

### Bcrypt

- **Purpose**: Bcrypt is used for hashing passwords securely.
- **Usage in Code**:
  - When a user signs up, their password is hashed before being stored in the database.
  - Example:
    ```javascript
    const hashedpassword = await bcrypt.hash(password, 4);
    ```

### Zod

- **Purpose**: Zod is used for input validation.
- **Usage in Code**:
  - It validates the signup data to ensure that the email, name, password, and confirmation password meet specific criteria.
  - Example:
    ```javascript
    const validBody = z.object({
        email: z.string().min(5).max(20).email(),
        // ...other fields
    });
    ```

### JWT

- **Purpose**: JSON Web Token (JWT) is used for secure authentication.
- **Usage in Code**:
  - After successful sign-in, a token is generated and sent back to the user for subsequent authenticated requests.
  - Example:
    ```javascript
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET_KEY);
    ```

    ## 📂 Project Structure

```plaintext
Todo App Backend
│
├── index.js           # Main application file where the server and routes are defined.
├── dataBase.js        # Contains Mongoose schema definitions for User and Todo models.
├── package.json       # Defines the project's dependencies and scripts.
├── package-lock.json  # Records the exact versions of dependencies installed.
└── README.md          # Project documentation

