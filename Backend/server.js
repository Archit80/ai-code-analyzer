import dotenv from 'dotenv'; // Import dotenv to load environment variables
import app from './src/app.js'; // Import the app instance from src/app.js

dotenv.config();

const port = process.env.PORT || 3000; // Set the port to listen on, defaulting to 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a message when the server starts
});
