require('dotenv').config();

const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateImage } = require('./midjourney.cjs');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined');
}

if (!process.env.MIDJOURNEY_API_KEY) {
  throw new Error('MIDJOURNEY_API_KEY is not defined');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-story', async (req, res) => {
  console.log('Received POST request to /generate-story');

  const { characters, storyPrompt } = req.body;

  if (!characters || !Array.isArray(characters) || !storyPrompt) {
    return res.status(400).json({ error: 'Invalid input: characters must be an array and storyPrompt must be provided' });
  }

  const characterDescriptions = characters.map(char => `${char.name}, a ${char.gender}, age ${char.age}, with ${char.skin} skin, ${char.hair} hair, and ${char.eyes} eyes`).join(', ');
  const prompt = `Crea una historia corta para niños con los siguientes personajes: ${characterDescriptions}. El tema de la historia es: ${storyPrompt}. La historia debe estar en español y no contener más de 50 palabras.`;

  console.log('Prompt sent to ChatGPT:', prompt); // Log the prompt

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un asistente creativo para generar historias para niños." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log('API Response:', JSON.stringify(response, null, 2));

    if (response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
      const generatedStory = response.choices[0].message.content.trim();
      res.json({ story: generatedStory });
    } else {
      console.error('Unexpected response format from OpenAI:', JSON.stringify(response, null, 2));
      res.status(500).json({ error: 'Unexpected response format from OpenAI' });
    }
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Error generating story' });
  }
});

app.post('/generate-image', async (req, res) => {
  const { skinColor, hairType, eyeColor } = req.body;
  const prompt = `Generate an image of a character with ${skinColor} skin, ${hairType} hair, and ${eyeColor} eyes`;

  console.log('Prompt sent to MidJourney:', prompt); // Log the prompt

  try {
    const imageUrl = await generateImage(prompt);
    console.log('Generated Image URL:', imageUrl); // Log the image URL
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error.message); // Log error message
    res.status(500).json({ error: 'Error generating image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  
});
