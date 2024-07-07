const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-story', async (req, res) => {
  console.log('Received POST request to /generate-story');

  const { characters, storyPrompt } = req.body;

  if (!characters || !Array.isArray(characters) || !storyPrompt) {
    return res.status(400).json({ error: 'Invalid input: characters must be an array and storyPrompt must be provided' });
  }

  const prompt = `Crea una historia corta para niños con los siguientes personajes: ${JSON.stringify(characters)}. El tema de la historia es: ${storyPrompt}. La historia debe estar en español y no contener más de 50 palabras.`;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
