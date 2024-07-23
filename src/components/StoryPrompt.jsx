import React, { useState } from 'react';
import axios from 'axios';
import { generateStoryPrompt } from '../utils/generateStoryPrompt.cjs';

const StoryPrompt = ({ characters, nextStep, prevStep }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');
  const [story, setStory] = useState('');
  const [prompts, setPrompts] = useState([]);

  const handleStoryTitleChange = (e) => {
    setStoryTitle(e.target.value);
  };

  const handleStoryPromptChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/generate-story', { storyTitle, characters, storyPrompt });
      setStory(response.data.story);
      setPrompts(response.data.prompts);
      console.log('Prompts to be sent to MidJourney:', response.data.prompts);
    } catch (error) {
      console.error('Error generating story:', error);
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
