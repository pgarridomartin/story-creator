require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const { generateImage } = require('./midjourney.cjs'); // Aquí deberías tener tu integración con Stable Diffusion
const { extractImagePrompts } = require('../src/utils/extractImagePrompts.cjs');
const { generateStoryPrompt } = require('../src/utils/generateStoryPrompt.cjs');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ruta para generar la historia usando GPT-4 mini
app.post('/generate-story', async (req, res) => {
  const { characters, storyTitle, storyPrompt } = req.body;
  if (!characters || !storyTitle || !storyPrompt) {
    return res.status(400).json({ error: 'Invalid input: characters, storyTitle, and storyPrompt must be provided' });
  }

  const prompt = generateStoryPrompt(characters, storyTitle, storyPrompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative assistant that helps to generate children stories." },
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const generatedStory = response.choices[0].message.content.trim();
    console.log('Generated story sin filtrar:', generatedStory); // Log de la historia generada
    res.json({ story: generatedStory });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Error generating story' });
  }
});

// Ruta para generar imágenes usando Stable Diffusion
app.post('/generate-images', async (req, res) => {
  const { prompt, seed } = req.body;

  console.log('Received prompt:', prompt);
  console.log('Received seed:', seed);

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt must be provided to generate image' });
  }

  try {
    const imageData = await generateImage(prompt, seed);
    console.log('Generated image seed:', imageData.seed);

    if (!imageData || !imageData.image) {
      throw new Error('Invalid image data received');
    }

    res.json({ 
      imageUrl: `data:image/jpeg;base64,${imageData.image}`, 
      seed: imageData.seed  || null
    });
  } catch (error) {
    console.error('Error generating images:', error.message || error);
    res.status(500).json({ error: 'Error generating images' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

