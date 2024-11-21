# Shawty - URL Shortener

Shawty is a simple and efficient URL shortener application that converts long URLs into concise, shareable links. This project is built using Node.js, Express.js, and MongoDB.

---

## Features
- Shorten long URLs
- Retrieve original URLs using shortened links
- Persistent storage with MongoDB
- Easy-to-use interface

---

## Prerequisites
To run this application locally, you need the following:
- **Node.js** (v14 or above)
- **npm** (comes with Node.js)
- **MongoDB** (any version compatible with your system, either locally or via a cloud service like MongoDB Atlas)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/retrojokerr/Shawty-URL-Shortner.git
   cd Shawty-URL-Shortner

2. Set up the Database
- Local MongoDB Instance: Ensure MongoDB is running on your machine.
- MongoDB Atlas:
   = Create a cluster and get the connection URI.
   - Update the MONGO_URI in the .env file as follows:
     ```bash
     MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database_name>?retryWrites=true&w=majority

3. Set up Environment Variables
  - Create a .env file in the root directory.
  - Add the required environment variables:
    ```bash
    PORT=3000
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database_name>?retryWrites=true&w=majority

4. Running Instructions
  - Start the Application
  - Run the following command to start the application:
    npm start
  - Access the Application : Open your browser and navigate to http://localhost:3000.
  - Shorten a URL :
       - Enter a long URL in the input field on the homepage.
       - Click "Shorten."
  - Retrieve the Original URL : Use the generated shortened URL in your browser or API to retrieve the original link.

5. Development Mode

  - For development, you can use nodemon for automatic server restarts on code changes.

     1. Install nodemon globally:
        ```bash
        npm install -g nodemon
     2. Start the application in development mode:
        ```bash
        nodemon

6. Troubleshooting

   - Database Connection Issues
       - Verify that MongoDB is running or your MongoDB Atlas connection string is correct.
       - Check the .env file for typos or missing values.
   - Port Conflicts
       - Ensure that the port defined in the .env file (default: 3000) is not already in use.
   - Missing Dependencies
       - Run `npm install` again to ensure all required packages are installed.

7. Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

8. License

   This project is licensed under the MIT License.
