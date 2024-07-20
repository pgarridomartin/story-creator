import React, { useState } from 'react';
import CharacterCustomization from '../components/CharacterCustomization.jsx';
import StoryPrompt from '../components/StoryPrompt.jsx';

const CreateStoryPage = ({ navigateTo }) => {
  const [step, setStep] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [story, setStory] = useState('');

  const handleCharacterUpdate = (updatedCharacter) => {
    setCharacters([updatedCharacter]);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
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
          setStory={setStory}
        />
      )}
      {step === 3 && (
        <div>
          <h2>Historia Generada</h2>
          <p>{story}</p>
          <button onClick={() => navigateTo('home')}>Volver al Inicio</button>
        </div>
      )}
    </div>
  );
};

export default CreateStoryPage;
