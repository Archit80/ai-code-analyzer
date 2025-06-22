import express from 'express';
import aiRoutes from './routes/ai.routes.js'; // Import the AI routes
import cors from 'cors'; // Import CORS middleware

const app = express(); // <- creates an instance of an Express server

app.use(express.json()); // <- middleware to parse JSON request bodies
app.use(cors()); // <- enables CORS for all routes

app.get('/', (req, res) => {
    // console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

    res.send('Hello, World!'); 
 })

app.use('/ai', aiRoutes);

export default app; // <- exports the app instance for use in other files
// This allows us to import the app instance in other files, such as the server file
