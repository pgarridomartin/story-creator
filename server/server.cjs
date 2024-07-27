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
  const { characters, storyTitle, storyPrompt } = req.body;
  if (!characters || !storyTitle || !storyPrompt) {
    return res.status(400).json({ error: 'Invalid input: characters, storyTitle, and storyPrompt must be provided' });
  }

  const prompt = generateStoryPrompt(characters, storyTitle, storyPrompt);
  console.log('Prompt sent to ChatGPT:', prompt); // Log the prompt

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

    const generatedStory = response.choices[0].message.content.trim();
    console.log('Generated story:', generatedStory); // Log the generated story
    res.json({ story: generatedStory });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Error generating story' });
  }
});

app.post('/generate-images', async (req, res) => {
  const { story } = req.body;
  if (!story) {
    return res.status(400).json({ error: 'Story must be provided to generate image prompts' });
  }

  const imagePrompts = extractImagePrompts(story);
  console.log('Extracted image prompts:', imagePrompts); // Log extracted prompts

  try {
    const imageUrls = [];
    for (const prompt of imagePrompts) {
      console.log('Generating image with prompt:', prompt); // Log each prompt before generating image
      const imageUrl = await generateImage(prompt);
      imageUrls.push(imageUrl);
    }
    res.json({ imageUrls });
  } catch (error) {
    console.error('Error generating images:', error);
    res.status(500).json({ error: 'Error generating images' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
