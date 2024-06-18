// server.cjs
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors'); // Importa cors
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS para permitir peticiones desde el frontend
app.use(cors());
app.use(express.json());

// Inicialización de OpenAI con tu clave de API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ruta para generar historias
app.post('/generate-story', async (req, res) => {
  console.log('Received POST request to /generate-story');

  const { characters, storyPrompt } = req.body;

  const prompt = `Create a short story for children featuring the following characters: ${JSON.stringify(characters)}. The story prompt is: ${storyPrompt}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a creative assistant for generating children's stories." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log('API Response:', response);

    if (response.choices && response.choices.length > 0) {
      const generatedStory = response.choices[0].message.content.trim();
      res.json({ story: generatedStory });
    } else {
      console.error('Unexpected response format from OpenAI:', response);
      res.status(500).json({ error: 'Unexpected response format from OpenAI' });
    }
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Error generating story' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
