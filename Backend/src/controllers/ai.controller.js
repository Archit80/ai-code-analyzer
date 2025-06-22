import generateDeepSeek from "../services/ai.service.js"; // Import the AI service

export const getResponse = async (req, res) => {
  const code = req.body.code; // Get the prompt from the query parameters

  if (!code) {
    return res.status(400).json({ error: "Prompt is required" }); // Return an error if no prompt is provided
  }

  const response = await generateDeepSeek(code); // Call the AI service to generate content based on the prompt

  res.send(response); // Send the generated content as the response
};
