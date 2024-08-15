import React, { useState } from 'react';
import CharacterCustomization from '../components/CharacterCustomization.jsx';
import StoryPrompt from '../components/StoryPrompt.jsx';
import StoryDisplay from '../components/StoryDisplay.jsx';
import CharacterSummary from '../components/CharacterSummary.jsx';

const CreateStoryPage = ({ navigateTo }) => {
  const [step, setStep] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [generatedStory, setGeneratedStory] = useState('');
  const [images, setImages] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null); // Agregar esta línea
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleCharacterUpdate = (character) => {
    setCharacters((prevCharacters) => {
      const existingCharacterIndex = prevCharacters.findIndex((c) => c.name === character.name);
      if (existingCharacterIndex !== -1) {
        const updatedCharacters = [...prevCharacters];
        updatedCharacters[existingCharacterIndex] = character;
        return updatedCharacters;
      } else {
        return [...prevCharacters, character];
      }
    });
  };

  const removeCharacter = (index) => {
    setCharacters((prevCharacters) => prevCharacters.filter((_, i) => i !== index));
  };

  const editCharacter = (index) => {
    setEditingCharacter(index);
    setStep(1);
  };

  const generateImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/generate-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story: generatedStory }),
      });
      const data = await response.json();
      setImages(data.imageUrls || []);
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-story-page">
      {step === 1 && (
        <CharacterCustomization
          onCharacterUpdate={handleCharacterUpdate}
          nextStep={nextStep}
          prevStep={prevStep}
          character={editingCharacter !== null ? characters[editingCharacter] : null}
        />
      )}
      {step === 2 && (
        <CharacterSummary
          characters={characters}
          nextStep={nextStep}
          prevStep={prevStep}
          navigateTo={navigateTo}
          removeCharacter={removeCharacter}
          editCharacter={editCharacter}
        />
      )}
      {step === 3 && (
        <StoryPrompt
          characters={characters}
          nextStep={nextStep}
          prevStep={prevStep}
          setGeneratedStory={setGeneratedStory}
          setPrompts={setPrompts}
        />
      )}
      {step === 4 && (
        <div>
          <h2>Historia Generada</h2>
          <StoryDisplay story={generatedStory} />
          <button onClick={generateImages}>Generar Imágenes</button>
          {loading && <p>Loading...</p>}
          <button onClick={() => navigateTo('home')}>Volver a la página de inicio</button>
          {images.length > 0 && (
            <div className="image-gallery">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Generated ${index}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateStoryPage;
