import { useState } from 'react';

const StoryForm = ({ characters, prevStep, addMoreCharacters }) => {
  const [storyPrompt, setStoryPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');

  const handleChange = (e) => {
    setStoryPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending POST request to http://localhost:3001/generate-story'); // Agrega esto
    fetch('http://localhost:3001/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ characters, storyPrompt }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGeneratedStory(data.story);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Sugerencia para la historia:
          <textarea name="storyPrompt" value={storyPrompt} onChange={handleChange} required></textarea>
        </label>
        <div className="buttons">
          <button type="button" className="button secondary" onClick={prevStep}>Atrás</button>
          <button type="button" className="button" onClick={addMoreCharacters}>Añadir más personajes</button>
          <button type="submit" className="button">Generar Historia</button>
        </div>
      </form>
      {generatedStory && (
        <div className="story-output">
          <h2>Historia Generada:</h2>
          <p>{generatedStory}</p>
        </div>
      )}
    </div>
  );
};

export { StoryForm };
