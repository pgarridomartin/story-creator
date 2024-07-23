import React, { useState } from 'react';
import axios from 'axios';
import { generateStoryPrompt } from '../utils/generateStoryPrompt.cjs';

const StoryPrompt = ({ characters, nextStep, prevStep }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');
  const [story, setStory] = useState('');
  const [images, setImages] = useState([]);
  const [imagePrompts, setImagePrompts] = useState([]);

  const handleStoryTitleChange = (e) => {
    setStoryTitle(e.target.value);
  };

  const handleStoryPromptChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = generateStoryPrompt(storyTitle, characters, storyPrompt);
    console.log('Generated Prompt:', prompt);
    try {
      const response = await axios.post('http://localhost:3001/generate-story', { storyTitle, characters, storyPrompt });
      setStory(response.data.story);
      setImages(response.data.images);

      // Log the image prompts
      const prompts = response.data.imagePrompts;
      setImagePrompts(prompts);
      console.log('Image Prompts to be sent to MidJourney:', prompts);
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
          {images.map((image, index) => (
            <div key={index}>
              <h3>Imagen {index + 1}</h3>
              <img src={image} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
      {imagePrompts.length > 0 && (
        <div className="image-prompts">
          <h2>Prompts para MidJourney</h2>
          {imagePrompts.map((prompt, index) => (
            <p key={index}>{prompt}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryPrompt;
