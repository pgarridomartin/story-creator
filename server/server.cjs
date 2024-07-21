require('dotenv').config();

const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateImage } = require('./midjourney.cjs');
const extractImagePrompts = require('./utils/extractImagePrompts.jsx');

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

  const { characters, storyTitle, storyPrompt } = req.body;

  if (!characters || !Array.isArray(characters) || !storyPrompt || !storyTitle) {
    return res.status(400).json({ error: 'Invalid input: characters must be an array, storyPrompt and storyTitle must be provided' });
  }

  const protagonistDescriptions = characters.filter(char => char.role === 'protagonist').map(char => {
    const skinDescription = char.skin || "default skin";
    const hairDescription = char.hair || "default hair";
    const eyeDescription = char.eyes || "default eyes";
    const eyebrowDescription = char.eyebrows || "default eyebrows";
    const noseDescription = char.nose || "default nose";
    const mouthDescription = char.mouth || "default mouth";

    console.log('Protagonist:', char); // Log protagonist info

    return `${char.name}, a ${char.gender}, age ${char.age}, with ${skinDescription}, ${hairDescription}, ${eyeDescription}, ${eyebrowDescription}, ${noseDescription}, and ${mouthDescription}`;
  }).join(', ');

  const secondaryDescriptions = characters.filter(char => char.role === 'secondary').map(char => {
    const skinDescription = char.skin || "default skin";
    const hairDescription = char.hair || "default hair";
    const eyeDescription = char.eyes || "default eyes";
    const eyebrowDescription = char.eyebrows || "default eyebrows";
    const noseDescription = char.nose || "default nose";
    const mouthDescription = char.mouth || "default mouth";

    console.log('Secondary character:', char); // Log secondary character info

    return `${char.name}, a ${char.gender}, age ${char.age}, with ${skinDescription}, ${hairDescription}, ${eyeDescription}, ${eyebrowDescription}, ${noseDescription}, and ${mouthDescription}`;
  }).join(', ');

  const prompt = `Por favor, genera un cuento infantil personalizado basado en los siguientes parámetros proporcionados por el usuario:

1. Título del cuento: ${storyTitle}
2. Descripción de los personajes:
   - Protagonistas: ${protagonistDescriptions}
   - Personajes secundarios: ${secondaryDescriptions}
3. Tema o mensaje del cuento: ${storyPrompt}

Estructura del cuento: Introducción, desarrollo, clímax, resolución, conclusión.

Asegúrate de que el cuento esté dividido en secciones claras, identificadas como "Sección 1", "Sección 2", etc., con un título y una descripción detallada de cada escena, para que estas puedan ser usadas como prompts para generar ilustraciones. Cada sección debe tener una descripción vívida del escenario y las acciones principales.

Genera una historia fluida y coherente con estos elementos.`;

  console.log('Prompt sent to ChatGPT:', prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
      
      // Extract prompts for MidJourney from the generated story
      const imagePrompts = extractImagePrompts(generatedStory);

      const imageUrls = await Promise.all(imagePrompts.map(prompt => generateImage(prompt)));

      res.json({ story: generatedStory, images: imageUrls });
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
