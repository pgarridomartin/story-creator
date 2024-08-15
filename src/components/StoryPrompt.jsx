import React, { useState } from 'react';
import axios from 'axios';
import { extractImagePrompts } from '../utils/extractImagePrompts.cjs'; // Asegúrate de ajustar la ruta si es necesario
import LoadingSpinner from '../components/LoadingSpinner.jsx'; // Asegúrate de ajustar la ruta si es necesario

const StoryPrompt = ({ characters, nextStep, prevStep, setGeneratedStory }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar la animación de carga

  const handleStoryTitleChange = (e) => {
    setStoryTitle(e.target.value);
  };

  const handleStoryPromptChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar la animación de carga
    try {
      const response = await axios.post('http://localhost:3001/generate-story', { storyTitle, characters, storyPrompt });
      const generatedStory = response.data.story;
      const prompts = extractImagePrompts(generatedStory); // Extraer prompts de la historia generada
      setStory(generatedStory);
      setGeneratedStory(generatedStory, prompts); // Actualizar el estado en CreateStoryPage
      nextStep();
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setLoading(false); // Ocultar la animación de carga
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
      {loading && <LoadingSpinner />} {/* Mostrar animación de carga */}
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
