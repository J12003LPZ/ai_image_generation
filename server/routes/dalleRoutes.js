import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.route("/").get((res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/texttoimage",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.OPENAI_API_KEY, 
      "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
    },
    data: { text: prompt },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating image");
  }
});

export default router;
