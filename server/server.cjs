require('dotenv').config();

const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateImage } = require('./midjourney.cjs');
const { extractImagePrompts } = require('../src/utils/extractImagePrompts.cjs');
const { generateStoryPrompt } = require('../src/utils/generateStoryPrompt.cjs');

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

  const { storyTitle, characters, storyPrompt } = req.body;

  if (!storyTitle || !characters || !Array.isArray(characters) || !storyPrompt) {
    return res.status(400).json({ error: 'Invalid input: storyTitle, characters must be an array, and storyPrompt must be provided' });
  }

  const prompt = generateStoryPrompt(storyTitle, characters, storyPrompt);
  console.log('Prompt sent to ChatGPT:', prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un asistente creativo para generar historias para niños." },
        { role: "user", content: prompt }
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    if (response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
      const generatedStory = response.choices[0].message.content.trim();
      console.log('Generated story:', generatedStory);

      const imagePrompts = extractImagePrompts(generatedStory);
      console.log('Extracted prompts:', imagePrompts);

      const imageUrls = await Promise.all(imagePrompts.map(async (prompt) => {
        console.log(`Prompt sent to MidJourney: ${prompt}`);
        return await generateImage(prompt);
      }));

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
