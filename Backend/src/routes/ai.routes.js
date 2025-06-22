import express from "express";
import { getResponse } from "../controllers/ai.controller.js"; // Import the AI controller

const router = express.Router();

router.post("/get-res", getResponse); // Define a route to handle GET requests for generating AI responses

export default router;
