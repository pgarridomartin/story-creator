import React, { useState } from 'react';
import { CharacterForm } from '../components/CharacterForm.js';
import CharacterCustomization from '../components/CharacterCustomization.js';
import { StoryForm } from '../components/StoryForm.js';

const CreateStoryPage = ({ navigateTo }) => {
  const [characters, setCharacters] = useState([]);
  const [currentStep, setCurrentStep] = useState('characterForm');

  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  const nextStep = () => {
    console.log('Next step');
    if (currentStep === 'characterForm') {
      setCurrentStep('characterCustomization');
    } else if (currentStep === 'characterCustomization') {
      setCurrentStep('storyForm');
    }
  };

  const prevStep = () => {
    console.log('Previous step');
    if (currentStep === 'characterCustomization') {
      setCurrentStep('characterForm');
    } else if (currentStep === 'storyForm') {
      setCurrentStep('characterCustomization');
    } else if (currentStep === 'characterForm') {
      navigateTo('home');
    }
  };

  const addMoreCharacters = () => {
    setCurrentStep('characterForm');
  };

  console.log(`Current step: ${currentStep}`);

  return (
    <div>
      {currentStep === 'characterForm' && <CharacterForm nextStep={nextStep} prevStep={prevStep} addCharacter={addCharacter} />}
      {currentStep === 'characterCustomization' && <CharacterCustomization prevStep={prevStep} nextStep={nextStep} onCharacterUpdate={addCharacter} />}
      {currentStep === 'storyForm' && <StoryForm characters={characters} prevStep={prevStep} addMoreCharacters={addMoreCharacters} />}
    </div>
  );
};

export { CreateStoryPage };
