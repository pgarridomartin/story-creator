import React, { useState } from 'react';
import axios from 'axios';
import {
  skinDescriptions,
  hairDescriptions,
  eyeDescriptions,
  eyebrowDescriptions,
  noseDescriptions,
  mouthDescriptions
} from '../utils/descriptions.jsx';

const StoryPrompt = ({ characters, nextStep, prevStep, setGeneratedStory }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');
  const [story, setStory] = useState('');

  const handleStoryTitleChange = (e) => {
    setStoryTitle(e.target.value);
  };

  const handleStoryPromptChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/generate-story', { characters, storyTitle, storyPrompt });
      setStory(response.data.story);
      setGeneratedStory(response.data.story);
      console.log('Generated Story:', response.data.story); // Log the generated story

      // Generate image prompts based on the generated story pages
      const imagePrompts = response.data.imagePrompts;
      const imageResponses = await Promise.all(imagePrompts.map(prompt => axios.post('http://localhost:3001/generate-image', { prompt })));
      const imageUrls = imageResponses.map(response => response.data.imageUrl);

      console.log('Generated Image URLs:', imageUrls); // Log the generated image URLs

    } catch (error) {
      console.error('Error generating story or images:', error);
    }
    nextStep();
  };

  return (
    <div className="container">
      <h2>Sugerencia de Historia</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título del cuento:
          <input
            type="text"
            name="storyTitle"
            value={storyTitle}
            onChange={handleStoryTitleChange}
            required
          />
        </label>
        <label>
          Sugerencia de historia:
          <input
            type="text"
            name="storyPrompt"
            value={storyPrompt}
            onChange={handleStoryPromptChange}
            required
          />
        </label>
        <div className="buttons">
          <button type="button" className="button secondary" onClick={prevStep}>Atrás</button>
          <button type="submit" className="button">Generar Historia</button>
        </div>
      </form>
      {story && (
        <div className="story-preview">
          <h2>Historia Generada</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
};

export default StoryPrompt;
