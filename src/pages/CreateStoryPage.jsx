import React, { useState } from 'react';
import CharacterCustomization from '../components/CharacterCustomization.jsx';
import StoryPrompt from '../components/StoryPrompt.jsx';
import StoryDisplay from '../components/StoryDisplay.jsx';
import CharacterSummary from '../components/CharacterSummary.jsx';
import { extractImagePrompts } from '../utils/extractImagePrompts.cjs';

const CreateStoryPage = ({ navigateTo }) => {
  const [step, setStep] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [generatedStory, setGeneratedStory] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [initialSeed, setInitialSeed] = useState(null); // Almacena el seed

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
    setEditingCharacter(null);
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
      const imagePrompts = extractImagePrompts(generatedStory);
      console.log('Extracted image prompts:', imagePrompts);
  
      for (const [index, prompt] of imagePrompts.entries()) {
        const response = await fetch('http://localhost:3001/generate-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            seed: initialSeed || undefined // Asegúrate de que el seed se maneja correctamente
          }),
        });
  
        const data = await response.json();
  
        if (data.imageUrl) {
          setImages((prevImages) => [...prevImages, data.imageUrl]);
  
          // Guarda el seed de la primera imagen generada
          if (index === 0 && data.seed) {
            setInitialSeed(data.seed);
          }
        } else {
          console.error('No image URL returned:', data);
        }
      }
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
        />
      )}
      {step === 4 && (
        <div>
          <h2>Historia Generada</h2>
          <StoryDisplay story={generatedStory} />
          <button onClick={generateImages}>Generar Imágenes</button>
          <button onClick={() => navigateTo('home')}>Volver a la página de inicio</button>
          {loading && <p>Generando imágenes...</p>}
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
