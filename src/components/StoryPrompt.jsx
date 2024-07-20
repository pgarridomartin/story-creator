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

const generateStoryPrompt = (characters, storyPrompt) => {
  const characterDescriptions = characters.map(char => {
    const skinDescription = skinDescriptions[char.skin] || "default skin";
    const hairDescription = hairDescriptions[char.hair] || "default hair";
    const eyeDescription = eyeDescriptions[char.eyes] || "default eyes";
    const eyebrowDescription = eyebrowDescriptions[char.eyebrows] || "default eyebrows";
    const noseDescription = noseDescriptions[char.nose] || "default nose";
    const mouthDescription = mouthDescriptions[char.mouth] || "default mouth";

    return `${char.name}, a ${char.gender}, age ${char.age}, with ${skinDescription}, ${hairDescription}, ${eyeDescription}, ${eyebrowDescription}, ${noseDescription}, and ${mouthDescription}`;
  }).join(', ');

  return `Crea una historia corta para niños con los siguientes personajes: ${characterDescriptions}. El tema de la historia es: ${storyPrompt}. La historia debe estar en español y no contener más de 50 palabras.`;
};

const StoryPrompt = ({ characters, nextStep, prevStep }) => {
  const [storyPrompt, setStoryPrompt] = useState('');
  const [story, setStory] = useState('');

  const handleStoryPromptChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = generateStoryPrompt(characters, storyPrompt);
    console.log('Generated Prompt:', prompt);
    try {
      const response = await axios.post('http://localhost:3001/generate-story', { characters, storyPrompt });
      setStory(response.data.story);
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
