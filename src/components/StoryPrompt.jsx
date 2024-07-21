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

const generateStoryPrompt = (characters, storyTitle, storyPrompt) => {
  const protagonistDescriptions = characters.filter(char => char.role === 'protagonist').map(char => {
    const skinDescription = skinDescriptions[char.skin] || "default skin";
    const hairDescription = hairDescriptions[char.hair] || "default hair";
    const eyeDescription = eyeDescriptions[char.eyes] || "default eyes";
    const eyebrowDescription = eyebrowDescriptions[char.eyebrows] || "default eyebrows";
    const noseDescription = noseDescriptions[char.nose] || "default nose";
    const mouthDescription = mouthDescriptions[char.mouth] || "default mouth";

    console.log('Protagonist:', char); // Log protagonist info

    return `${char.name}, a ${char.gender}, age ${char.age}, with ${skinDescription}, ${hairDescription}, ${eyeDescription}, ${eyebrowDescription}, ${noseDescription}, and ${mouthDescription}`;
  }).join(', ');

  const secondaryDescriptions = characters.filter(char => char.role === 'secondary').map(char => {
    const skinDescription = skinDescriptions[char.skin] || "default skin";
    const hairDescription = hairDescriptions[char.hair] || "default hair";
    const eyeDescription = eyeDescriptions[char.eyes] || "default eyes";
    const eyebrowDescription = eyebrowDescriptions[char.eyebrows] || "default eyebrows";
    const noseDescription = noseDescriptions[char.nose] || "default nose";
    const mouthDescription = mouthDescriptions[char.mouth] || "default mouth";

    console.log('Secondary character:', char); // Log secondary character info

    return `${char.name}, a ${char.gender}, age ${char.age}, with ${skinDescription}, ${hairDescription}, ${eyeDescription}, ${eyebrowDescription}, ${noseDescription}, and ${mouthDescription}`;
  }).join(', ');

  return `Por favor, genera un cuento infantil personalizado basado en los siguientes parámetros proporcionados por el usuario:

1. Título del cuento: ${storyTitle}
2. Descripción de los personajes:
   - Protagonistas: ${protagonistDescriptions}
   - Personajes secundarios: ${secondaryDescriptions}
3. Tema o mensaje del cuento: ${storyPrompt}

Estructura del cuento: Introducción, desarrollo, clímax, resolución, conclusión.

Asegúrate de que el cuento esté dividido en secciones claras, identificadas como "Sección 1", "Sección 2", etc., con un título y una descripción detallada de cada escena, para que estas puedan ser usadas como prompts para generar ilustraciones. Cada sección debe tener una descripción vívida del escenario y las acciones principales.

Genera una historia fluida y coherente con estos elementos.`;
};

const StoryPrompt = ({ characters, nextStep, prevStep, setGeneratedStory }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');

  const handleStoryTitleChange = (e) => {
    setStoryTitle(e.target.value);
  };

  const handleStoryPromptChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = generateStoryPrompt(characters, storyTitle, storyPrompt);
    console.log('Generated Prompt:', prompt);
    try {
      const response = await axios.post('http://localhost:3001/generate-story', { characters, storyTitle, storyPrompt });
      setGeneratedStory(response.data.story);
      console.log('Generated Story:', response.data.story); // Log the generated story

      // Generate image prompts based on the generated story sections
      const imagePrompts = extractImagePrompts(response.data.story);
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
      <div className="story-preview">
        <h2>Historia Generada</h2>
        <p>{story}</p>
      </div>
    </div>
  );
};

// Function to extract image prompts from the generated story
function extractImagePrompts(generatedStory) {
  // Implement your logic to extract prompts for images
  return ["Prompt 1", "Prompt 2"]; // Replace with actual prompts
}

export default StoryPrompt;
