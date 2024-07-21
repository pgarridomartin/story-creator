import React, { useState } from 'react';
import CharacterCustomization from '../components/CharacterCustomization.jsx';
import StoryPrompt from '../components/StoryPrompt.jsx';

const CreateStoryPage = ({ navigateTo }) => {
  const [step, setStep] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [generatedStory, setGeneratedStory] = useState('');

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

  return (
    <div className="create-story-page">
      {step === 1 && (
        <CharacterCustomization
          onCharacterUpdate={handleCharacterUpdate}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 2 && (
        <StoryPrompt
          characters={characters}
          nextStep={nextStep}
          prevStep={prevStep}
          setGeneratedStory={setGeneratedStory}
        />
      )}
      {step === 3 && (
        <div>
          <h2>Historia Generada</h2>
          <p>{generatedStory}</p>
          <button onClick={() => navigateTo('home')}>Volver a la página de inicio</button>
        </div>
      )}
    </div>
  );
};

export default CreateStoryPage;
