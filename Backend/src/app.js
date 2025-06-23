import express from 'express';
import aiRoutes from './routes/ai.routes.js'; // Import the AI routes
import cors from 'cors'; // Import CORS middleware
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
dotenv.config(); // Load environment variables from .env file
const app = express(); // <- creates an instance of an Express server

// app.use(cors({
//   origin: ['http://localhost:5173', 'https://your-frontend-domain.com']
// })); // <- enables CORS for these URLs

app.use (cors());
app.use(express.json()); // <- middleware to parse JSON request bodies

app.get('/', (req, res) => {
    // console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
    console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);

    res.send('Hello, World!', `${process.env.OPENROUTER_API_KEY}`); // <- responds with a simple message
 })

 
app.use('/ai', aiRoutes);

export default app; // <- exports the app instance for use in other files
// This allows us to import the app instance in other files, such as the server file
