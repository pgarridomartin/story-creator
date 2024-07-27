// src/components/StoryPrompt.jsx
import React, { useState } from 'react';
import axios from 'axios';

const StoryPrompt = ({ characters, nextStep, prevStep }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');
  const [story, setStory] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleStoryPromptChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleStoryTitleChange = (e) => {
    setStoryTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/generate-story', { characters, storyTitle, storyPrompt });
      setStory(response.data.story);
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  const generateImages = async () => {
    if (!story) {
      console.error('No story available to generate image prompts');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/generate-images', { story });
      setImageUrls(response.data.imageUrls);
    } catch (error) {
      console.error('Error generating images:', error);
    }
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
          <button className="button" onClick={generateImages}>Generar Imágenes</button>
        </div>
      )}
      {imageUrls.length > 0 && (
        <div className="image-previews">
          <h2>Imágenes Generadas</h2>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Generated ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryPrompt;
